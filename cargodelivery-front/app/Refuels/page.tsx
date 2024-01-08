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
    Refuel,
    RefuelIn,
    User,
} from "@/generated";

import { UUID } from 'crypto';
import { create, deleteById, getRefuels } from './fetch';
import { validateRequired, validateRequiredCar, validateRequiredDate, validateRequiredDateInFuture, validateRequiredDriver, validateRequiredFuelStation, validateRequiredNumber } from '../Validators/validation';
import HeaderTabs from '../Menu/Menu';
import { getCars } from '../Cars/fetchCars';
import { getUsers } from '../Users/fetch';
import { getDrivers } from '../Drivers/fetch';
import { getFuelStations } from '../FuelStations/fetch';

const Refuels = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    const columns = useMemo<MRT_ColumnDef<Refuel>[]>(
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
                accessorKey: 'price',
                header: 'Цена',
                mantineEditTextInputProps: {
                    type: 'number',
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
            },
            {
                accessorKey: 'dateTime',
                header: 'Дата и время',
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
                      {date?.toISOString()}
                    </Text>
                    },
            },
            {
                accessorKey: 'fuelStation',
                header: 'АЗС',
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.name,
                    //remove any previous validation errors when refuel focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
                Cell: ({ cell }) =>  {
                    let fuelStation = cell.getValue<FuelStation>();
                    return <Text>
                      {
                      fuelStation?.name + " " + fuelStation?.description + 
                      " " + fuelStation?.coordinates.latitude +
                      " " + fuelStation?.coordinates.longitude
                      }
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
                        getFuelStations()
                        .then((response: Array<FuelStation>) => {
                            return response.map( (fuelStation: FuelStation) => {
                                const items = {
                                    value: fuelStation.id,
                                    label: fuelStation.name + " " + fuelStation.description + 
                                    " " + fuelStation.coordinates.latitude +
                                    " " + fuelStation.coordinates.longitude
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
                        if (isCreatingRefuel) {
                            table.setCreatingRow(row);
                        } else if (isUpdatingRefuel) {
                            table.setEditingRow(row);
                        }
                    };

                    if (isLoading) return <p>Loading...</p>
                    if (!data) return <p>No refuel stations data</p>
                
                    const onChange = (event) => {
                        console.log("handleChange");
                        console.log(event);
                        setSelectedId(event);
                    }

                    return <Select onChange={onChange} onBlur={onBlur}
                        label="АЗС"
                        placeholder="Выберите значение"
                        data={data}
                    />;
                },
            },
            {
                accessorKey: 'car',
                header: 'Автомобиль',
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.name,
                    //remove any previous validation errors when refuel focuses on the input
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
                      {car?.plateNumber + " " + car?.mark + " " + car?.model}
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
                        if (isCreatingRefuel) {
                            table.setCreatingRow(row);
                        } else if (isUpdatingRefuel) {
                            table.setEditingRow(row);
                        }
                    };

                    if (isLoading) return <p>Loading...</p>
                    if (!data) return <p>No car models data</p>
                
                    const onChange = (event) => {
                        console.log("handleChange");
                        console.log(event);
                        setSelectedId(event);
                    }

                    return <Select onChange={onChange} onBlur={onBlur}
                        label="Машина"
                        placeholder="Выберите значение"
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
                    //remove any previous validation errors when refuel focuses on the input
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
                      {driver?.user.firstName + " " + driver?.user.lastName}
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
                                    label: driver.user.firstName + " " + driver.user.lastName
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
                        if (isCreatingRefuel) {
                            table.setCreatingRow(row);
                        } else if (isUpdatingRefuel) {
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
                        label="Водитель"
                        placeholder="Выберите значение"
                        data={data}
                    />;
                },
            },
        ],
        [validationErrors],
    );

    //call CREATE hook
    const { mutateAsync: createRefuel, isLoading: isCreatingRefuel } =
        useCreateRefuel();
    //call READ hook
    const {
        data: fetchedRefuels = [],
        isError: isLoadingRefuelsError,
        isFetching: isFetchingRefuels,
        isLoading: isLoadingRefuels,
    } = useGetRefuels();
    //call UPDATE hook
    const { mutateAsync: updateRefuel, isLoading: isUpdatingRefuel } =
        useUpdateRefuel();
    //call DELETE hook
    const { mutateAsync: deleteRefuel, isLoading: isDeletingRefuel } =
        useDeleteRefuel();

    //CREATE action
    const handleCreateRefuel: MRT_TableOptions<Refuel>['onCreatingRowSave'] = async ({
            values,
            exitCreatingMode,
        }) => {
        let refuelIn: RefuelIn = {
            price : values.price,
            dateTime : new Date(values.dateTime),
            fuelStationId : values.fuelStation,
            carId : values.car,
            driverId : values.driver,
        }
        console.log("handleCreateRefuel")
        console.log("refuelIn " + refuelIn)
        const newValidationErrors = validateRefuelIn(refuelIn);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createRefuel(refuelIn);
        exitCreatingMode();
    };

    //UPDATE action
    const handleSaveRefuel: MRT_TableOptions<Refuel>['onEditingRowSave'] = async ({
            values,
            table,
        }) => {
        const newValidationErrors = validateRefuel(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateRefuel(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = (row: MRT_Row<Refuel>) =>
        modals.openConfirmModal({
            title: 'Are you sure you want to delete this refuel?',
            children: (
                <Text>
                    Are you sure you want to delete refuel 
                    {row.original.price} {' '} {row.original.fuelStation.name}
                     {' '} {row.original.fuelStation.description}
                     {' '} {row.original.fuelStation.coordinates.latitude}
                     {' '} {row.original.fuelStation.coordinates.longitude}
                    ? This action cannot be undone.
                </Text>
            ),
            labels: { confirm: 'Delete', cancel: 'Cancel' },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteRefuel(row.original.id),
        });

    const table = useMantineReactTable({
        columns,
        data: fetchedRefuels,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.id,
        mantineToolbarAlertBannerProps: isLoadingRefuelsError
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
        onCreatingRowSave: handleCreateRefuel,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveRefuel,
        renderCreateRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Создать новую заправку</Title>
                {internalEditComponents}
                <Flex justify="flex-end" mt="xl">
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </Flex>
            </Stack>
        ),
        renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Edit Refuel</Title>
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
                Создать новую заправку
            </Button>
        ),
        state: {
            isLoading: isLoadingRefuels,
            isSaving: isCreatingRefuel || isUpdatingRefuel || isDeletingRefuel,
            showAlertBanner: isLoadingRefuelsError,
            showProgressBars: isFetchingRefuels,
        },
    });

    return <MantineReactTable table={table} />;
};

//CREATE hook (post new refuel to api)
function useCreateRefuel() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (refuelIn: RefuelIn) => {
            return Promise.resolve(create(refuelIn));
        },
        //client side optimistic update
        onMutate: (newRefuelInfo: RefuelIn) => {
            queryClient.setQueryData(
                ['refuels'],
                (prevRefuels: any) =>
                    [
                        ...prevRefuels,
                        {
                            ...newRefuelInfo,
                            // id: newRefuelInfo.id,
                        },
                    ] as RefuelIn[],
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['refuels'] }),
    });
}

//READ hook (get refuels from api)
export function useGetRefuels() {
    console.log("useGetRefuels")
    return useQuery<Array<Refuel>>({
        queryKey: ['refuels'],
        queryFn: async () => {
            return Promise.resolve(getRefuels());
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put refuel in api)
function useUpdateRefuel() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (refuel: Refuel) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newRefuelInfo: Refuel) => {
            queryClient.setQueryData(
                ['refuels'],
                (prevRefuels: any) =>
                    prevRefuels?.map((prevRefuel: Refuel) =>
                        prevRefuel.id === newRefuelInfo.id ? newRefuelInfo : prevRefuel,
                    ),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['refuels'] }), //refetch refuels after mutation, disabled for demo
    });
}

//DELETE hook (delete refuel in api)
function useDeleteRefuel() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (refuelId: string) => {
            return Promise.resolve(deleteById(refuelId));
        },
        //client side optimistic update
        onMutate: (refuelId: string) => {
            queryClient.setQueryData(
                ['refuels'],
                (prevRefuels: any) =>
                    prevRefuels?.filter((refuel: Refuel) => refuel.id !== refuelId),
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['refuels'] }),
    });
}

const queryClient = new QueryClient();

const RefuelsWithProviders = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <ModalsProvider>
            <HeaderTabs />
            <Refuels />
        </ModalsProvider>
    </QueryClientProvider>
);

export default RefuelsWithProviders;

function validateRefuel(refuel: Refuel) {
    return {
        price: !validateRequiredNumber(refuel.price)
            ? 'Price is Required'
            : '',
        dateTime: !validateRequiredDate(refuel.dateTime)
            ? 'Date time is Required'
            : '',
        fuelStation: !validateRequiredFuelStation(refuel.fuelStation)
            ? 'Fuel station is Required'
            : '',
        car: !validateRequiredCar(refuel.car)
            ? 'Car is Required'
            : '',
        driver: !validateRequiredDriver(refuel.driver)
            ? 'Driver is Required'
            : '',
    };
};

function validateRefuelIn(refuelIn: RefuelIn) {
    console.log("validateRefuelIn")
    console.log(refuelIn)
    return {
        price: !validateRequiredNumber(refuelIn.price)
            ? 'Price is Required'
            : '',
        dateTime: !validateRequiredDate(refuelIn.dateTime)
            ? 'Date time is Required'
            : '',
        fuelStation: !validateRequired(refuelIn.fuelStationId)
            ? 'Fuel station id is Required'
            : '',
        car: !validateRequired(refuelIn.carId)
            ? 'Car id is Required'
            : '',
        driver: !validateRequired(refuelIn.driverId)
            ? 'Driver id is Required'
            : '',
    };
};
