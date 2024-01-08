"use client"

import { useEffect, useMemo, useState } from 'react';
import {
    MRT_EditActionButtons,
    MantineReactTable,
    type MRT_ColumnDef,
    type MRT_Row,
    type MRT_TableOptions,
    useMantineReactTable,
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
    User,
    Order,
    OrderIn,
    Settlement,
} from "@/generated";

import { create, deleteById, getOrders } from './fetch';
import { validateRequired, validateRequiredNumber } from '../Validators/validation';
import { UUID } from 'crypto';
import { getSettlements } from '../Settlements/fetchSettlements';
import { getUsers } from '../Users/fetch';
import HeaderTabs from '../Menu/Menu';

const Orders = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    const columns = useMemo<MRT_ColumnDef<Order>[]>(
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
                accessorKey: 'user',
                header: 'Пользователь',
                Cell: ({ cell }) =>  {
                    let user = cell.getValue<User>();
                    return <Text>
                      {"Пользователь: " + user?.firstName + " " + user?.lastName + " " + 
                      user?.middleName + " " + user?.role } 
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
                            return response.map( (user: User) => {
                                const items = {
                                    value: user.id,
                                    label: user.firstName + " " + user.lastName
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
                        const hTMLInputElement: HTMLInputElement = event.target;
                        console.log(hTMLInputElement);

                        row._valuesCache[column.id] = selectedId;
                        if (isCreatingOrder) {
                            table.setCreatingRow(row);
                        } else if (isUpdatingOrder) {
                            table.setEditingRow(row);
                        }
                    };

                    if (isLoading) return <p>Loading...</p>
                    if (!data) return <p>No users data</p>

                    const onChange = (event) => {
                        console.log("handleChange");
                        console.log(event);
                        setSelectedId(event);
                    }

                    return <Select onChange={onChange} onBlur={onBlur}
                        label="Имя и фамилия клиента"
                        placeholder="Выберите значение"
                        data={data}
                    />;
                },
                mantineEditTextInputProps: {
                    type: 'email',
                    required: true,
                    error: validationErrors?.name,
                    //remove any previous validation errors when order focuses on the input
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
                header: 'Дата создания',
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
                accessorKey: 'departureSettlement',
                header: 'Населённый пункт отправления',
                Cell: ({ cell }) =>  {
                    let settlement = cell.getValue<Settlement>();
                    return <Text>
                      {`${settlement.name}`} 
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
                        getSettlements()
                        .then((response: Array<Settlement>) => {
                            return response.map( (settlement: Settlement) => {
                                const items = {
                                    value: settlement.id,
                                    label: settlement.name
                                };
                                return items;
                            });
                        })
                        .then((data) => {
                            setData(data)
                            setLoading(false)
                        })
                    }, [])

                    const onBlur = (event) => {
                        const hTMLInputElement: HTMLInputElement = event.target;
                        console.log(hTMLInputElement);

                        row._valuesCache[column.id] = selectedId;
                        if (isCreatingOrder) {
                            table.setCreatingRow(row);
                        } else if (isUpdatingOrder) {
                            table.setEditingRow(row);
                        }
                    };

                    if (isLoading) return <p>Loading...</p>
                    if (!data) return <p>No settlements data</p>

                    const onChange = (event) => {
                        console.log("handleChange");
                        console.log(event);
                        setSelectedId(event);
                    }

                    return <Select onChange={onChange} onBlur={onBlur}
                        label="Место отправления"
                        placeholder="Выберите значение"
                        data={data}
                    />;
                },
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.name,
                    //remove any previous validation errors when order focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'destinationSettlement',
                header: 'Населённый пункт назначения',
                Cell: ({ cell }) =>  {
                    let settlement = cell.getValue<Settlement>();
                    return <Text>
                      {`${settlement.name}`} 
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
                        getSettlements()
                        .then((response: Array<Settlement>) => {
                            return response.map( (settlement: Settlement) => {
                                const items = {
                                    value: settlement.id,
                                    label: settlement.name
                                };
                                return items;
                            });
                        })
                        .then((data) => {
                            setData(data)
                            setLoading(false)
                        })
                    }, [])

                    const onBlur = (event) => {
                        const hTMLInputElement: HTMLInputElement = event.target;
                        console.log(hTMLInputElement);

                        row._valuesCache[column.id] = selectedId;
                        if (isCreatingOrder) {
                            table.setCreatingRow(row);
                        } else if (isUpdatingOrder) {
                            table.setEditingRow(row);
                        }
                    };

                    if (isLoading) return <p>Loading...</p>
                    if (!data) return <p>No settlements data</p>

                    const onChange = (event) => {
                        console.log("handleChange");
                        console.log(event);
                        setSelectedId(event);
                    }

                    return <Select onChange={onChange} onBlur={onBlur}
                        label="Место прибытия"
                        placeholder="Выберите значение"
                        data={data}
                    />;
                },
                mantineEditTextInputProps: {
                    type: 'email',
                    required: true,
                    error: validationErrors?.name,
                    //remove any previous validation errors when order focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'weight',
                header: 'Вес',
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
                accessorKey: 'volume',
                header: 'Объём',
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
        ],
        [validationErrors],
    );

    //call CREATE hook
    const { mutateAsync: createOrder, isLoading: isCreatingOrder } =
        useCreateOrder();
    //call READ hook
    const {
        data: fetchedOrders = [],
        isError: isLoadingOrdersError,
        isFetching: isFetchingOrders,
        isLoading: isLoadingOrders,
    } = useGetOrders();
    //call UPDATE hook
    const { mutateAsync: updateOrder, isLoading: isUpdatingOrder } =
        useUpdateOrder();
    //call DELETE hook
    const { mutateAsync: deleteOrder, isLoading: isDeletingOrder } =
        useDeleteOrder();

    //CREATE action
    const handleCreateOrder: MRT_TableOptions<Order>['onCreatingRowSave'] = async ({
            values,
            exitCreatingMode,
        }) => {
        console.log("handleCreateOrderValues");
        console.log(values);
        let orderIn: OrderIn = {
            userId : values.user,
            departureSettlementId : values.departureSettlement,
            destinationSettlementId :  values.destinationSettlement,
            weight :  values.weight,
            volume : values.volume,
            price : values.price,
        }
        console.log("handleCreateOrder");
        console.log(orderIn);
        const newValidationErrors = validateOrderIn(orderIn);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createOrder(orderIn);
        exitCreatingMode();
    };

    //UPDATE action
    const handleSaveOrder: MRT_TableOptions<Order>['onEditingRowSave'] = async ({
            values,
            table,
        }) => {
        const newValidationErrors = validateOrder(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateOrder(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = (row: MRT_Row<Order>) =>
        modals.openConfirmModal({
            title: 'Are you sure you want to delete this order?',
            children: (
                <Text>
                    Are you sure you want to delete order 
                    {row.original.id} {' '} {row.original.price}
                    ? This action cannot be undone.
                </Text>
            ),
            labels: { confirm: 'Delete', cancel: 'Cancel' },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteOrder(row.original.id),
        });

    const table = useMantineReactTable({
        columns,
        data: fetchedOrders,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.id,
        mantineToolbarAlertBannerProps: isLoadingOrdersError
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
        onCreatingRowSave: handleCreateOrder,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveOrder,
        renderCreateRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Создать новый заказ</Title>
                {internalEditComponents}
                <Flex justify="flex-end" mt="xl">
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </Flex>
            </Stack>
        ),
        renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Edit Order</Title>
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
                Создать новый заказ
            </Button>
        ),
        state: {
            isLoading: isLoadingOrders,
            isSaving: isCreatingOrder || isUpdatingOrder || isDeletingOrder,
            showAlertBanner: isLoadingOrdersError,
            showProgressBars: isFetchingOrders,
        },
    });

    return <MantineReactTable table={table} />;
};

//CREATE hook (post new order to api)
function useCreateOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (orderIn: OrderIn) => {
            return Promise.resolve(create(orderIn));
        },
        //client side optimistic update
        onMutate: (newOrderInfo: OrderIn) => {
            queryClient.setQueryData(
                ['orders'],
                (prevOrders: any) =>
                    [
                        ...prevOrders,
                        {
                            ...newOrderInfo,
                            // id: newOrderInfo.id,
                        },
                    ] as OrderIn[],
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
    });
}

//READ hook (get orders from api)
export function useGetOrders() {
    console.log("useGetOrders")
    return useQuery<Array<Order>>({
        queryKey: ['orders'],
        queryFn: async () => {
            return Promise.resolve(getOrders());
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put order in api)
function useUpdateOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (order: Order) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newOrderInfo: Order) => {
            queryClient.setQueryData(
                ['orders'],
                (prevOrders: any) =>
                    prevOrders?.map((prevOrder: Order) =>
                        prevOrder.id === newOrderInfo.id ? newOrderInfo : prevOrder,
                    ),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['orders'] }), //refetch orders after mutation, disabled for demo
    });
}

//DELETE hook (delete order in api)
function useDeleteOrder() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (orderId: string) => {
            return Promise.resolve(deleteById(orderId));
        },
        //client side optimistic update
        onMutate: (orderId: string) => {
            queryClient.setQueryData(
                ['orders'],
                (prevOrders: any) =>
                    prevOrders?.filter((order: Order) => order.id !== orderId),
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
    });
}

const queryClient = new QueryClient();

const OrdersWithProviders = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <ModalsProvider>
            <HeaderTabs />
            <Orders />
        </ModalsProvider>
    </QueryClientProvider>
);

export default OrdersWithProviders;

//TODO: Finish validation!
function validateOrder(order: Order) {
    return {
        // departureFlightId: !validateRequired(order.departureFlight)
        //     ? 'Departure flight is Required'
        //     : '',
        //     arrivalFlightId: !validateRequired(order.arrivalFlight)
        //     ? 'Arrival flight is Required'
        //     : '',
        //     settlementToHotelId: !validateRequired(order.settlementToHotel)
        //     ? 'Settlement to hotel is Required'
        //     : '',
        //     settlementFromHotelId: !validateRequired(order.settlementFromHotel)
        //     ? 'Settlement from hotel is Required'
        //     : '',
        weight: !validateRequiredNumber(order.weight)
        ? 'Weight is Required'
        : '',
        volume: !validateRequiredNumber(order.volume)
            ? 'Weight is Required'
            : '',
        price: !validateRequiredNumber(order.price)
            ? 'Price is Required'
            : '',
            // userId: !validateRequired(order.user)
            // ? 'User is Required'
            // : '',
            // selectedFoodOptionId: !validateRequired(order.selectedFoodOption)
            // ? 'Food option is Required'
            // : '',
    };
};

function validateOrderIn(orderIn: OrderIn) {
    console.log("validateOrderIn")
    console.log(orderIn)
    return {
        // departureFlightId: !validateRequired(orderIn.departureFlightId)
        //     ? 'Departure flight is Required'
        //     : '',
        //     arrivalFlightId: !validateRequired(orderIn.arrivalFlightId)
        //     ? 'Arrival flight is Required'
        //     : '',
        //     settlementToHotelId: !validateRequired(orderIn.settlementToHotelId)
        //     ? 'Settlement to hotel is Required'
        //     : '',
        //     settlementFromHotelId: !validateRequired(orderIn.settlementFromHotelId)
        //     ? 'Settlement from hotel is Required'
        //     : '',
        weight: !validateRequiredNumber(orderIn.weight)
            ? 'Weight is Required'
            : '',
        volume: !validateRequiredNumber(orderIn.volume)
            ? 'Weight is Required'
            : '',
        price: !validateRequiredNumber(orderIn.price)
            ? 'Price is Required'
            : '',
            // userId: !validateRequired(orderIn.userId)
            // ? 'User is Required'
            // : '',
            // selectedFoodOptionId: !validateRequired(orderIn.selectedFoodOptionId)
            // ? 'Food option is Required'
            // : '',
    };
};
