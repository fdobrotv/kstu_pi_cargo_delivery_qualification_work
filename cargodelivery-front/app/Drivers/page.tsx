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
    DriverIn,
    User,
} from "@/generated";

import { UUID } from 'crypto';
import { create, deleteById, getDrivers } from './fetch';
import { validateRequired, validateRequiredDateInFuture } from '../Validators/validation';
import HeaderTabs from '../Menu/Menu';
import { getCars } from '../Cars/fetchCars';
import { getUsers } from '../Users/fetch';

const Drivers = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    const columns = useMemo<MRT_ColumnDef<Driver>[]>(
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
                accessorKey: 'car',
                header: 'Автомобиль',
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.name,
                    //remove any previous validation errors when driver focuses on the input
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
                        if (isCreatingDriver) {
                            table.setCreatingRow(row);
                        } else if (isUpdatingDriver) {
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
                        label="Автомобиль"
                        placeholder="Выберите значение"
                        data={data}
                    />;
                },
            },
            {
                accessorKey: 'user',
                header: 'Пользователь',
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.name,
                    //remove any previous validation errors when driver focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
                Cell: ({ cell }) =>  {
                    let user = cell.getValue<User>();
                    return <Text>
                      {user.firstName + " " + user.lastName + " " + user.middleName}
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
                        getUsers()
                        .then((response: Array<User>) => {
                            return response.map( (userModel: User) => {
                                const items = {
                                    value: userModel.id,
                                    label: userModel.firstName + " " + userModel.lastName + " " + userModel.middleName
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
                        if (isCreatingDriver) {
                            table.setCreatingRow(row);
                        } else if (isUpdatingDriver) {
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
                        label="Пользователь"
                        placeholder="Выберите значение"
                        data={data}
                    />;
                },
            },
        ],
        [validationErrors],
    );

    //call CREATE hook
    const { mutateAsync: createDriver, isLoading: isCreatingDriver } =
        useCreateDriver();
    //call READ hook
    const {
        data: fetchedDrivers = [],
        isError: isLoadingDriversError,
        isFetching: isFetchingDrivers,
        isLoading: isLoadingDrivers,
    } = useGetDrivers();
    //call UPDATE hook
    const { mutateAsync: updateDriver, isLoading: isUpdatingDriver } =
        useUpdateDriver();
    //call DELETE hook
    const { mutateAsync: deleteDriver, isLoading: isDeletingDriver } =
        useDeleteDriver();

    //CREATE action
    const handleCreateDriver: MRT_TableOptions<Driver>['onCreatingRowSave'] = async ({
            values,
            exitCreatingMode,
        }) => {
        let driverIn: DriverIn = {
            carId : values.car,
            userId : values.user,
        }
        const newValidationErrors = validateDriverIn(driverIn);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createDriver(driverIn);
        exitCreatingMode();
    };

    //UPDATE action
    const handleSaveDriver: MRT_TableOptions<Driver>['onEditingRowSave'] = async ({
            values,
            table,
        }) => {
        const newValidationErrors = validateDriver(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateDriver(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = (row: MRT_Row<Driver>) =>
        modals.openConfirmModal({
            title: 'Are you sure you want to delete this driver?',
            children: (
                <Text>
                    Are you sure you want to delete driver 
                    {row.original.user.firstName} {' '} {row.original.user.lastName}
                    ? This action cannot be undone.
                </Text>
            ),
            labels: { confirm: 'Delete', cancel: 'Cancel' },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteDriver(row.original.id),
        });

    const table = useMantineReactTable({
        columns,
        data: fetchedDrivers,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.id,
        mantineToolbarAlertBannerProps: isLoadingDriversError
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
        onCreatingRowSave: handleCreateDriver,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveDriver,
        renderCreateRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Создать нового водителя</Title>
                {internalEditComponents}
                <Flex justify="flex-end" mt="xl">
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </Flex>
            </Stack>
        ),
        renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Edit Driver</Title>
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
                Создать нового водителя
            </Button>
        ),
        state: {
            isLoading: isLoadingDrivers,
            isSaving: isCreatingDriver || isUpdatingDriver || isDeletingDriver,
            showAlertBanner: isLoadingDriversError,
            showProgressBars: isFetchingDrivers,
        },
    });

    return <MantineReactTable table={table} />;
};

//CREATE hook (post new driver to api)
function useCreateDriver() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (driverIn: DriverIn) => {
            return Promise.resolve(create(driverIn));
        },
        //client side optimistic update
        onMutate: (newDriverInfo: DriverIn) => {
            queryClient.setQueryData(
                ['drivers'],
                (prevDrivers: any) =>
                    [
                        ...prevDrivers,
                        {
                            ...newDriverInfo,
                            // id: newDriverInfo.id,
                        },
                    ] as DriverIn[],
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['drivers'] }),
    });
}

//READ hook (get drivers from api)
export function useGetDrivers() {
    console.log("useGetDrivers")
    return useQuery<Array<Driver>>({
        queryKey: ['drivers'],
        queryFn: async () => {
            return Promise.resolve(getDrivers());
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put driver in api)
function useUpdateDriver() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (driver: Driver) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newDriverInfo: Driver) => {
            queryClient.setQueryData(
                ['drivers'],
                (prevDrivers: any) =>
                    prevDrivers?.map((prevDriver: Driver) =>
                        prevDriver.id === newDriverInfo.id ? newDriverInfo : prevDriver,
                    ),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['drivers'] }), //refetch drivers after mutation, disabled for demo
    });
}

//DELETE hook (delete driver in api)
function useDeleteDriver() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (driverId: string) => {
            return Promise.resolve(deleteById(driverId));
        },
        //client side optimistic update
        onMutate: (driverId: string) => {
            queryClient.setQueryData(
                ['drivers'],
                (prevDrivers: any) =>
                    prevDrivers?.filter((driver: Driver) => driver.id !== driverId),
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['drivers'] }),
    });
}

const queryClient = new QueryClient();

const DriversWithProviders = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <ModalsProvider>
            <HeaderTabs />
            <Drivers />
        </ModalsProvider>
    </QueryClientProvider>
);

export default DriversWithProviders;

function validateDriver(driver: Driver) {
    return {
        carId: !validateRequired(driver.car.id)
            ? 'Car id is Required'
            : '',
        userId: !validateRequired(driver.user.id)
            ? 'User id is Required'
            : '',
    };
};

function validateDriverIn(driverIn: DriverIn) {
    console.log("validateDriverIn")
    console.log(driverIn)
    return {
        carId: !validateRequired(driverIn.carId)
            ? 'Car id is Required'
            : '',
        userId: !validateRequired(driverIn.userId)
            ? 'User id is Required'
            : '',
    };
};
