"use client"

import { useEffect, useMemo, useState } from 'react';
import {
    MRT_EditActionButtons,
    MantineReactTable,
    type MRT_ColumnDef,
    type MRT_Row,
    type MRT_TableOptions,
    useMantineReactTable,
    createRow,
} from 'mantine-react-table';
import {
    ActionIcon,
    Button,
    Flex,
    Select,
    Stack,
    Text,
    TextInput,
    Title,
    Tooltip,
} from '@mantine/core';
import { ModalsProvider, modals } from '@mantine/modals';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import {
    Car,
    Driver,
    FuelStation,
    Incident,
    IncidentIn,
    Point,
    User,
} from "@/generated";

import { UUID } from 'crypto';
import { create, deleteById, getIncidents } from './fetch';
import { validateRequired, validateRequiredCar, validateRequiredDate, validateRequiredDateInFuture, validateRequiredDriver, validateRequiredFuelStation, validateRequiredNumber, validateRequiredPoint } from '../Validators/validation';
import HeaderTabs from '../Menu/Menu';
import { getCars } from '../Cars/fetchCars';
import { getUsers } from '../Users/fetch';
import { getDrivers } from '../Drivers/fetch';
import { getFuelStations } from '../FuelStations/fetch';

const Incidents = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    const columns = useMemo<MRT_ColumnDef<Incident>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
                enableEditing: false,
                size: 80,
                mantineEditTextInputProps: {
                    required: false,
                    disabled: true,
                    variant: 'default',
                  },
                Edit: ({ cell, column, row, table }) => {
                    return <div hidden = {true}></div>;
                },
            },
            {
                accessorKey: 'description',
                header: 'Описание',
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.name,
                    //remove any previous validation errors when road focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'createdAt',
                header: 'Дата создания в БД',
                mantineEditTextInputProps: {
                    type: 'datetime-local',
                    required: true,
                    error: validationErrors?.name,
                    //remove any previous validation errors when settlement focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
                Cell: ({ cell }) =>  {
                    let date = cell.getValue<Date>();
                    return <Text>
                      {date?.toISOString()}
                    </Text>
                    },
                Edit: ({ cell, column, row, table }) => {
                    return <div hidden = {true}></div>;
                },
            },
            {
                accessorKey: 'dateTime',
                header: 'Дата и время события',
                mantineEditTextInputProps: {
                    type: 'datetime-local',
                    required: true,
                    error: validationErrors?.name,
                    //remove any previous validation errors when flight focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
                Cell: ({ cell }) =>  {
                    let date = cell.getValue<Date>();
                    return <Text>
                      {date.toISOString()}
                    </Text>
                    },
            },
            {
                accessorKey: 'car',
                header: 'Автомобиль',
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.name,
                    //remove any previous validation errors when incident focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
                Cell: ({ cell }) =>  {
                    let car = cell.getValue<Car>();
                    return <Text>
                      {car.plateNumber + " " + car.mark + " " + car.model}
                    </Text>
                    },
                Edit: ({ cell, column, row, table }) => {
                    interface Item {
                        value: string; 
                        label: string; 
                    }

                    const [data, setData] = useState<Array<Item>>([])
                    const [isLoading, setLoading] = useState(true)
                    const [selectedId, setSelectedId] = useState<UUID>()

                    useEffect(() => {
                        getCars()
                        .then((response: Array<Car>) => {
                            return response.map( (carModel: Car) => {
                                const items = {
                                    value: carModel.id,
                                    label: carModel.plateNumber + " " + carModel.mark + " " + carModel.model
                                }
                                return items;
                            });
                        })
                        .then((data) => {
                            setData(data)
                            setLoading(false)
                        })
                      }, [])

                    const onBlur = (event) => {
                        console.log("onBlur event type: " + typeof event);
                        console.log("onBlur event: " + event);
                        row._valuesCache[column.id] = selectedId
                        if (isCreatingIncident) {
                            table.setCreatingRow(row);
                        } else if (isUpdatingIncident) {
                            table.setEditingRow(row);
                        }
                    };

                    if (isLoading) return <p>Loading...</p>
                    if (!data) return <p>No cars data</p>
                
                    const onChange = (event) => {
                        console.log("handleChange");
                        console.log(event);
                        setSelectedId(event);
                    }

                    return <Select onChange={onChange} onBlur={onBlur}
                        label="Car"
                        placeholder="Pick value"
                        data={data}
                    />;
                },
            },
            {
                accessorKey: 'driver',
                header: 'Водитель',
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.name,
                    //remove any previous validation errors when incident focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
                Cell: ({ cell }) =>  {
                    let driver = cell.getValue<Driver>();
                    return <Text>
                      {driver.user.firstName + " " + driver.user.lastName + " " + driver.car.plateNumber}
                    </Text>
                    },
                Edit: ({ cell, column, row, table }) => {
                    interface Item {
                        value: string; 
                        label: string; 
                    }

                    const [data, setData] = useState<Array<Item>>([])
                    const [isLoading, setLoading] = useState(true)
                    const [selectedId, setSelectedId] = useState<UUID>()

                    useEffect(() => {
                        getDrivers()
                        .then((response: Array<Driver>) => {
                            return response.map( (driver: Driver) => {
                                const items = {
                                    value: driver.id,
                                    label: driver.user.firstName + " " + driver.user.lastName + " " + driver.car.plateNumber
                                }
                                return items;
                            });
                        })
                        .then((data) => {
                            setData(data)
                            setLoading(false)
                        })
                      }, [])

                    const onBlur = (event) => {
                        console.log("onBlur event type: " + typeof event);
                        console.log("onBlur event: " + event);
                        row._valuesCache[column.id] = selectedId
                        if (isCreatingIncident) {
                            table.setCreatingRow(row);
                        } else if (isUpdatingIncident) {
                            table.setEditingRow(row);
                        }
                    };

                    if (isLoading) return <p>Loading...</p>
                    if (!data) return <p>No user models data</p>
                
                    const onChange = (event) => {
                        console.log("handleChange");
                        console.log(event);
                        setSelectedId(event);
                    }

                    return <Select onChange={onChange} onBlur={onBlur}
                        label="Driver"
                        placeholder="Pick value"
                        data={data}
                    />;
                },
            },
            {
                accessorKey: 'coordinates',
                header: 'Координаты',
                Cell: ({ cell }) =>  {
                    let point = cell.getValue<Point>();
                    return <Text>
                      {point?.latitude + " " + point?.longitude}
                    </Text>
                    },
                Edit: ({ cell, column, row, table }) => {
                    const [latitude, setLatitude] = useState<number>(0)
                    const [longitude, setLongitude] = useState<number>(0)

                    const onBlur = (event) => {
                        const hTMLInputElement: HTMLInputElement = event.target;
                        console.log(hTMLInputElement);

                        const point: Point = {
                            latitude,
                            longitude
                        }

                        row._valuesCache[column.id] = point;
                        console.log("Coordinates modification");
                        console.log(row);
                        if (isCreatingIncident) {
                            table.setCreatingRow(row);
                        } else if (isUpdatingIncident) {
                            table.setEditingRow(row);
                        }
                    };

                    const onLatitudeChange = (event) => {
                        console.log("handleChange");
                        console.log(event);
                        setLatitude(event.target.value);
                    }

                    const onLongitudeChange = (event) => {
                        console.log("handleChange");
                        console.log(event);
                        setLongitude(event.target.value);
                    }

                    return <>
                        <TextInput onChange={onLatitudeChange} onBlur={onBlur}
                        label="Latitude"
                        placeholder="Enter latitude value"
                        />
                        <TextInput onChange={onLongitudeChange} onBlur={onBlur}
                        label="Longitude"
                        placeholder="Enter longitude value"
                        />
                    </>;
                },
                mantineEditTextInputProps: {
                    type: 'email',
                    required: true,
                    error: validationErrors?.name,
                    //remove any previous validation errors when point mark focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
        ],
        [validationErrors],
    );

    //call CREATE hook
    const { mutateAsync: createIncident, isLoading: isCreatingIncident } =
        useCreateIncident();
    //call READ hook
    const {
        data: fetchedIncidents = [],
        isError: isLoadingIncidentsError,
        isFetching: isFetchingIncidents,
        isLoading: isLoadingIncidents,
    } = useGetIncidents();
    //call UPDATE hook
    const { mutateAsync: updateIncident, isLoading: isUpdatingIncident } =
        useUpdateIncident();
    //call DELETE hook
    const { mutateAsync: deleteIncident, isLoading: isDeletingIncident } =
        useDeleteIncident();

    //CREATE action
    const handleCreateIncident: MRT_TableOptions<Incident>['onCreatingRowSave'] = async ({
            values,
            exitCreatingMode,
        }) => {
        let incidentIn: IncidentIn = {
            description : values.description,
            dateTime : new Date(values.dateTime),
            carId : values.car,
            driverId : values.driver,
            coordinates : values.coordinates,
        }
        console.log("handleCreateIncident")
        console.log("incidentIn " + incidentIn)
        const newValidationErrors = validateIncidentIn(incidentIn);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createIncident(incidentIn);
        exitCreatingMode();
    };

    //UPDATE action
    const handleSaveIncident: MRT_TableOptions<Incident>['onEditingRowSave'] = async ({
            values,
            table,
        }) => {
        const newValidationErrors = validateIncident(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateIncident(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = (row: MRT_Row<Incident>) =>
        modals.openConfirmModal({
            title: 'Are you sure you want to delete this incident?',
            children: (
                <Text>
                    Are you sure you want to delete incident 
                    {row.original.description}
                     {' '} {row.original.car.plateNumber}
                     {' '} {row.original.driver.user.firstName}
                     {' '} {row.original.driver.user.lastName}
                     {' '} {row.original.coordinates.latitude}
                     {' '} {row.original.coordinates.longitude}
                    ? This action cannot be undone.
                </Text>
            ),
            labels: { confirm: 'Delete', cancel: 'Cancel' },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteIncident(row.original.id),
        });

    const table = useMantineReactTable({
        columns,
        data: fetchedIncidents,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.id,
        mantineToolbarAlertBannerProps: isLoadingIncidentsError
            ? {
                color: 'red',
                children: 'Error loading data',
            }
            : undefined,
        mantineTableContainerProps: {
            sx: {
                minHeight: '500px',
            },
        },
        onCreatingRowCancel: () => setValidationErrors({}),
        onCreatingRowSave: handleCreateIncident,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveIncident,
        renderCreateRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Create New Incident</Title>
                {internalEditComponents}
                <Flex justify="flex-end" mt="xl">
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </Flex>
            </Stack>
        ),
        renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Edit Incident</Title>
                {internalEditComponents}
                <Flex justify="flex-end" mt="xl">
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </Flex>
            </Stack>
        ),
        renderRowActions: ({ row, table }) => (
            <Flex gap="md">
                <Tooltip label="Edit">
                    <ActionIcon onClick={() => table.setEditingRow(row)}>
                        <IconEdit />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Delete">
                    <ActionIcon color="red" onClick={() => openDeleteConfirmModal(row)}>
                        <IconTrash />
                    </ActionIcon>
                </Tooltip>
            </Flex>
        ),
        renderTopToolbarCustomActions: ({ table }) => (
            <Button
                onClick={() => {
                    table.setCreatingRow(true); //simplest way to open the create row modal with no default values
                    //or you can pass in a row object to set default values with the `createRow` helper function
                    // table.setCreatingRow(
                    //   createRow(table, {
                    //     id: "",
                    //     departureAirport: "Moskow",
                    //     arrivalAirport: "Istabmul",
                    //     departureDateTime: new Date(),
                    //     arrivalDateTime: new Date(),
                    //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
                    //   }),
                    // );
                }}
            >
                Create New Incident
            </Button>
        ),
        state: {
            isLoading: isLoadingIncidents,
            isSaving: isCreatingIncident || isUpdatingIncident || isDeletingIncident,
            showAlertBanner: isLoadingIncidentsError,
            showProgressBars: isFetchingIncidents,
        },
    });

    return <MantineReactTable table={table} />;
};

//CREATE hook (post new incident to api)
function useCreateIncident() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (incidentIn: IncidentIn) => {
            return Promise.resolve(create(incidentIn));
        },
        //client side optimistic update
        onMutate: (newIncidentInfo: IncidentIn) => {
            queryClient.setQueryData(
                ['incidents'],
                (prevIncidents: any) =>
                    [
                        ...prevIncidents,
                        {
                            ...newIncidentInfo,
                            // id: newIncidentInfo.id,
                        },
                    ] as IncidentIn[],
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['incidents'] }),
    });
}

//READ hook (get incidents from api)
export function useGetIncidents() {
    console.log("useGetIncidents")
    return useQuery<Array<Incident>>({
        queryKey: ['incidents'],
        queryFn: async () => {
            return Promise.resolve(getIncidents());
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put incident in api)
function useUpdateIncident() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (incident: Incident) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newIncidentInfo: Incident) => {
            queryClient.setQueryData(
                ['incidents'],
                (prevIncidents: any) =>
                    prevIncidents?.map((prevIncident: Incident) =>
                        prevIncident.id === newIncidentInfo.id ? newIncidentInfo : prevIncident,
                    ),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['incidents'] }), //refetch incidents after mutation, disabled for demo
    });
}

//DELETE hook (delete incident in api)
function useDeleteIncident() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (incidentId: string) => {
            return Promise.resolve(deleteById(incidentId));
        },
        //client side optimistic update
        onMutate: (incidentId: string) => {
            queryClient.setQueryData(
                ['incidents'],
                (prevIncidents: any) =>
                    prevIncidents?.filter((incident: Incident) => incident.id !== incidentId),
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['incidents'] }),
    });
}

const queryClient = new QueryClient();

const IncidentsWithProviders = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <ModalsProvider>
            <HeaderTabs />
            <Incidents />
        </ModalsProvider>
    </QueryClientProvider>
);

export default IncidentsWithProviders;

function validateIncident(incident: Incident) {
    return {
        description: !validateRequired(incident.description)
            ? 'Description is Required'
            : '',
        dateTime: !validateRequiredDate(incident.dateTime)
            ? 'Date time is Required'
            : '',
        car: !validateRequiredCar(incident.car)
            ? 'Car id is Required'
            : '',
        driver: !validateRequiredDriver(incident.driver)
            ? 'Driver id is Required'
            : '',
        coordinates: !validateRequiredPoint(incident.coordinates)
            ? 'Cordinates are Required'
            : '',
    };
};

function validateIncidentIn(incidentIn: IncidentIn) {
    console.log("validateIncidentIn")
    console.log(incidentIn)
    return {
        description: !validateRequired(incidentIn.description)
            ? 'Description is Required'
            : '',
        dateTime: !validateRequiredDate(incidentIn.dateTime)
            ? 'Date time is Required'
            : '',
        car: !validateRequired(incidentIn.carId)
            ? 'Car id is Required'
            : '',
        driver: !validateRequired(incidentIn.driverId)
            ? 'Driver id is Required'
            : '',
        coordinates: !validateRequiredPoint(incidentIn.coordinates)
            ? 'Cordinates are Required'
            : '',
    };
};
