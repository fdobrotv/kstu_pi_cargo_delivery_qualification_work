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
    WorkSlot,
    WorkSlotIn,
    Point,
} from "@/generated";

import { UUID } from 'crypto';
import { create, deleteById, getWorkSlots } from './fetch';
import { validateRequired, validateRequiredCar, validateRequiredDate, validateRequiredDateInFuture, validateRequiredDriver, validateRequiredFuelStation, validateRequiredNumber, validateRequiredPoint } from '../Validators/validation';
import HeaderTabs from '../Menu/Menu';
import { getCars } from '../Cars/fetchCars';
import { getDrivers } from '../Drivers/fetch';

const WorkSlots = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    const columns = useMemo<MRT_ColumnDef<WorkSlot>[]>(
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
                accessorKey: 'startedAt',
                header: 'Дата и время начала',
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
                accessorKey: 'finishedAt',
                header: 'Дата и время окончания',
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
                    console.log("finishedAt")
                    console.log(date)
                    return <Text>
                      {date?.toISOString()}
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
                    //remove any previous validation errors when workSlot focuses on the input
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
                        if (isCreatingWorkSlot) {
                            table.setCreatingRow(row);
                        } else if (isUpdatingWorkSlot) {
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
                    //remove any previous validation errors when workSlot focuses on the input
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
                        if (isCreatingWorkSlot) {
                            table.setCreatingRow(row);
                        } else if (isUpdatingWorkSlot) {
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
            {
                accessorKey: 'startCoordinates',
                header: 'Координаты начала',
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
                        if (isCreatingWorkSlot) {
                            table.setCreatingRow(row);
                        } else if (isUpdatingWorkSlot) {
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
                        label="Широта"
                        placeholder="Введите значение широты"
                        />
                        <TextInput onChange={onLongitudeChange} onBlur={onBlur}
                        label="Долгота"
                        placeholder="Введите значение долготы"
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
            {
                accessorKey: 'endCoordinates',
                header: 'Координаты окончания',
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
                        if (isCreatingWorkSlot) {
                            table.setCreatingRow(row);
                        } else if (isUpdatingWorkSlot) {
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
                        label="Широта"
                        placeholder="Введите значение широты"
                        />
                        <TextInput onChange={onLongitudeChange} onBlur={onBlur}
                        label="Долгота"
                        placeholder="Введите значение долготы"
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
    const { mutateAsync: createWorkSlot, isLoading: isCreatingWorkSlot } =
        useCreateWorkSlot();
    //call READ hook
    const {
        data: fetchedWorkSlots = [],
        isError: isLoadingWorkSlotsError,
        isFetching: isFetchingWorkSlots,
        isLoading: isLoadingWorkSlots,
    } = useGetWorkSlots();
    //call UPDATE hook
    const { mutateAsync: updateWorkSlot, isLoading: isUpdatingWorkSlot } =
        useUpdateWorkSlot();
    //call DELETE hook
    const { mutateAsync: deleteWorkSlot, isLoading: isDeletingWorkSlot } =
        useDeleteWorkSlot();

    //CREATE action
    const handleCreateWorkSlot: MRT_TableOptions<WorkSlot>['onCreatingRowSave'] = async ({
            values,
            exitCreatingMode,
        }) => {
        let workSlotIn: WorkSlotIn = {
            startedAt : new Date(values.startedAt),
            finishedAt : new Date(values.finishedAt),
            carId : values.car,
            driverId : values.driver,
            startCoordinates : values.startCoordinates,
            endCoordinates : values.endCoordinates,
        }
        console.log("handleCreateWorkSlot")
        console.log("workSlotIn " + workSlotIn)
        const newValidationErrors = validateWorkSlotIn(workSlotIn);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createWorkSlot(workSlotIn);
        exitCreatingMode();
    };

    //UPDATE action
    const handleSaveWorkSlot: MRT_TableOptions<WorkSlot>['onEditingRowSave'] = async ({
            values,
            table,
        }) => {
        const newValidationErrors = validateWorkSlot(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateWorkSlot(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = (row: MRT_Row<WorkSlot>) =>
        modals.openConfirmModal({
            title: 'Are you sure you want to delete this workSlot?',
            children: (
                <Text>
                    Are you sure you want to delete work slot 
                     {row.original.startedAt.toISOString()}
                     {row.original.finishedAt.toISOString()}
                     {' '} {row.original.car.plateNumber}
                     {' '} {row.original.driver.user.firstName}
                     {' '} {row.original.driver.user.lastName}
                     {' '} {row.original.startCoordinates.latitude}
                     {' '} {row.original.startCoordinates.longitude}
                     {' '} {row.original.endCoordinates.latitude}
                     {' '} {row.original.endCoordinates.longitude}
                    ? This action cannot be undone.
                </Text>
            ),
            labels: { confirm: 'Delete', cancel: 'Cancel' },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteWorkSlot(row.original.id),
        });

    const table = useMantineReactTable({
        columns,
        data: fetchedWorkSlots,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.id,
        mantineToolbarAlertBannerProps: isLoadingWorkSlotsError
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
        onCreatingRowSave: handleCreateWorkSlot,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveWorkSlot,
        renderCreateRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Создать новый отчёт о выполненной работе</Title>
                {internalEditComponents}
                <Flex justify="flex-end" mt="xl">
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </Flex>
            </Stack>
        ),
        renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Edit WorkSlot</Title>
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
                Создать новый отчёт о выполненной работе
            </Button>
        ),
        state: {
            isLoading: isLoadingWorkSlots,
            isSaving: isCreatingWorkSlot || isUpdatingWorkSlot || isDeletingWorkSlot,
            showAlertBanner: isLoadingWorkSlotsError,
            showProgressBars: isFetchingWorkSlots,
        },
    });

    return <MantineReactTable table={table} />;
};

//CREATE hook (post new workSlot to api)
function useCreateWorkSlot() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (workSlotIn: WorkSlotIn) => {
            return Promise.resolve(create(workSlotIn));
        },
        //client side optimistic update
        onMutate: (newWorkSlotInfo: WorkSlotIn) => {
            queryClient.setQueryData(
                ['workSlots'],
                (prevWorkSlots: any) =>
                    [
                        ...prevWorkSlots,
                        {
                            ...newWorkSlotInfo,
                            // id: newWorkSlotInfo.id,
                        },
                    ] as WorkSlotIn[],
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['workSlots'] }),
    });
}

//READ hook (get workSlots from api)
export function useGetWorkSlots() {
    console.log("useGetWorkSlots")
    return useQuery<Array<WorkSlot>>({
        queryKey: ['workSlots'],
        queryFn: async () => {
            return Promise.resolve(getWorkSlots());
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put workSlot in api)
function useUpdateWorkSlot() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (workSlot: WorkSlot) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newWorkSlotInfo: WorkSlot) => {
            queryClient.setQueryData(
                ['workSlots'],
                (prevWorkSlots: any) =>
                    prevWorkSlots?.map((prevWorkSlot: WorkSlot) =>
                        prevWorkSlot.id === newWorkSlotInfo.id ? newWorkSlotInfo : prevWorkSlot,
                    ),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['workSlots'] }), //refetch workSlots after mutation, disabled for demo
    });
}

//DELETE hook (delete workSlot in api)
function useDeleteWorkSlot() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (workSlotId: string) => {
            return Promise.resolve(deleteById(workSlotId));
        },
        //client side optimistic update
        onMutate: (workSlotId: string) => {
            queryClient.setQueryData(
                ['workSlots'],
                (prevWorkSlots: any) =>
                    prevWorkSlots?.filter((workSlot: WorkSlot) => workSlot.id !== workSlotId),
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['workSlots'] }),
    });
}

const queryClient = new QueryClient();

const WorkSlotsWithProviders = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <ModalsProvider>
            <HeaderTabs />
            <WorkSlots />
        </ModalsProvider>
    </QueryClientProvider>
);

export default WorkSlotsWithProviders;

function validateWorkSlot(workSlot: WorkSlot) {
    return {
        startedAt: !validateRequiredDate(workSlot.startedAt)
            ? 'Started at is Required'
            : '',
        finishedAt: !validateRequiredDate(workSlot.finishedAt)
            ? 'Finished at is Required'
            : '',
        car: !validateRequiredCar(workSlot.car)
            ? 'Car id is Required'
            : '',
        driver: !validateRequiredDriver(workSlot.driver)
            ? 'Driver id is Required'
            : '',
        startCoordinates: !validateRequiredPoint(workSlot.startCoordinates)
            ? 'Start cordinates are Required'
            : '',
        endCoordinates: !validateRequiredPoint(workSlot.endCoordinates)
            ? 'End cordinates are Required'
            : '',
    };
};

function validateWorkSlotIn(workSlotIn: WorkSlotIn) {
    console.log("validateWorkSlotIn")
    console.log(workSlotIn)
    return {
        startedAt: !validateRequiredDate(workSlotIn.startedAt)
            ? 'Started at is Required'
            : '',
        finishedAt: !validateRequiredDate(workSlotIn.finishedAt)
            ? 'Finished at is Required'
            : '',
        car: !validateRequired(workSlotIn.carId)
            ? 'Car id is Required'
            : '',
        driver: !validateRequired(workSlotIn.driverId)
            ? 'Driver id is Required'
            : '',
        startCoordinates: !validateRequiredPoint(workSlotIn.startCoordinates)
            ? 'Start cordinates are Required'
            : '',
        endCoordinates: !validateRequiredPoint(workSlotIn.endCoordinates)
            ? 'End cordinates are Required'
            : '',
    };
};
