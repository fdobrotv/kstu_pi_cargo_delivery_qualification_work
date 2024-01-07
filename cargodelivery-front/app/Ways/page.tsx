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
    Checkbox,
    Flex,
    MultiSelect,
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
    Road,
    Settlement,
    Way,
    WayIn,
} from "@/generated";

import { create, deleteById, getWays } from './fetch';
import { validateRequired, validateRequiredRoadIds, validateRequiredRoads, validateRequiredSettlement } from '../Validators/validation';
import HeaderTabs from '../Menu/Menu';
import { UUID } from 'crypto';
import { getSettlements } from '../Settlements/fetchSettlements';
import { getRoads } from '../Roads/fetch';

const Ways = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    const columns = useMemo<MRT_ColumnDef<Way>[]>(
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
                accessorKey: 'name',
                header: 'Наименование',
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.name,
                    //remove any previous validation errors when way focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'description',
                header: 'Описание',
                mantineEditTextInputProps: {
                    type: 'text',
                    required: true,
                    error: validationErrors?.name,
                    //remove any previous validation errors when way focuses on the input
                    onFocus: () =>
                        setValidationErrors({
                            ...validationErrors,
                            name: undefined,
                        }),
                    //optionally add validation checking for onBlur or onChange
                },
            },
            {
                accessorKey: 'departureSettlement',
                header: 'Населённый пункт отправления',
                Cell: ({ cell }) =>  {
                    let settlement = cell.getValue<Settlement>();
                    return <Text>
                      {`${settlement?.name}`} 
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
                        if (isCreatingWay) {
                            table.setCreatingRow(row);
                        } else if (isCreatingWay) {
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
                        label="Departure settlement"
                        placeholder="Pick value"
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
                      {`${settlement?.name}`} 
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
                        if (isCreatingWay) {
                            table.setCreatingRow(row);
                        } else if (isCreatingWay) {
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
                        label="Destination settlement"
                        placeholder="Pick value"
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
                accessorKey: 'roads',
                header: 'Дороги',
                Cell: ({ cell }) =>  {
                    let roads = cell.getValue<Road[]>();
                    return <Text>
                      {`${roads.map(road => road.name).join(", ")}`} 
                    </Text>
                },
                Edit: ({ cell, column, row, table }) => {
                    interface Item {
                        value: string; 
                        label: string; 
                    }

                    const [data, setData] = useState<Array<Item>>([])
                    const [isLoading, setLoading] = useState(true)
                    const [selectedIds, setSelectedIds] = useState<UUID[]>()

                    useEffect(() => {
                        getRoads()
                        .then((response: Array<Road>) => {
                            return response.map( (road: Road) => {
                                const items = {
                                    value: road.id,
                                    label: road.name + " " + road.description
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
                        console.log("roads onBlur");
                        console.log(hTMLInputElement);

                        row._valuesCache[column.id] = selectedIds;
                        if (isCreatingWay) {
                            table.setCreatingRow(row);
                        } else if (isCreatingWay) {
                            table.setEditingRow(row);
                        }
                    };

                    if (isLoading) return <p>Loading...</p>
                    if (!data) return <p>No settlements data</p>

                    const onChange = (event) => {
                        console.log("handleChange");
                        console.log(event);
                        setSelectedIds(event);
                    }

                    return <MultiSelect onChange={onChange} onBlur={onBlur}
                        label="Выбор подмножества дорог"
                        placeholder="Pick values"
                        searchable
                        nothingFound="Дорога не найдена"
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
        ],
        [validationErrors],
    );

    //call CREATE hook
    const { mutateAsync: createWay, isLoading: isCreatingWay } =
        useCreateWay();
    //call READ hook
    const {
        data: fetchedWays = [],
        isError: isLoadingWaysError,
        isFetching: isFetchingWays,
        isLoading: isLoadingWays,
    } = useGetWays();
    //call UPDATE hook
    const { mutateAsync: updateWay, isLoading: isUpdatingWay } =
        useUpdateWay();
    //call DELETE hook
    const { mutateAsync: deleteWay, isLoading: isDeletingWay } =
        useDeleteWay();

    //CREATE action
    const handleCreateWay: MRT_TableOptions<Way>['onCreatingRowSave'] = async ({
            values,
            exitCreatingMode,
        }) => {
        let wayIn: WayIn = {
            name : values.name,
            description : values.description,
            departureSettlementId : values.departureSettlement,
            destinationSettlementId : values.destinationSettlement,
            roadIds : values.roads,
        }
        console.log("handleCreateWay");
        console.log(wayIn);
        const newValidationErrors = validateWayIn(wayIn);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createWay(wayIn);
        exitCreatingMode();
    };

    //UPDATE action
    const handleSaveWay: MRT_TableOptions<Way>['onEditingRowSave'] = async ({
            values,
            table,
        }) => {
        const newValidationErrors = validateWay(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateWay(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = (row: MRT_Row<Way>) =>
        modals.openConfirmModal({
            title: 'Are you sure you want to delete this way?',
            children: (
                <Text>
                    Are you sure you want to delete way 
                    {row.original.name} 
                    {' '} {row.original.departureSettlement.name} 
                    {' '} {row.original.destinationSettlement.name}
                    ? This action cannot be undone.
                </Text>
            ),
            labels: { confirm: 'Delete', cancel: 'Cancel' },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteWay(row.original.id),
        });

    const table = useMantineReactTable({
        columns,
        data: fetchedWays,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.id,
        mantineToolbarAlertBannerProps: isLoadingWaysError
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
        onCreatingRowSave: handleCreateWay,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveWay,
        renderCreateRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Create New Way</Title>
                {internalEditComponents}
                <Flex justify="flex-end" mt="xl">
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </Flex>
            </Stack>
        ),
        renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Edit Way</Title>
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
                Create New Way
            </Button>
        ),
        state: {
            isLoading: isLoadingWays,
            isSaving: isCreatingWay || isUpdatingWay || isDeletingWay,
            showAlertBanner: isLoadingWaysError,
            showProgressBars: isFetchingWays,
        },
    });

    return <MantineReactTable table={table} />;
};

//CREATE hook (post new way to api)
function useCreateWay() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (wayIn: WayIn) => {
            return Promise.resolve(create(wayIn));
        },
        //client side optimistic update
        onMutate: (newWayInfo: WayIn) => {
            queryClient.setQueryData(
                ['ways'],
                (prevWays: any) =>
                    [
                        ...prevWays,
                        {
                            ...newWayInfo,
                            // id: newWayInfo.id,
                        },
                    ] as WayIn[],
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['ways'] }),
    });
}

//READ hook (get ways from api)
export function useGetWays() {
    console.log("useGetWays")
    return useQuery<Array<Way>>({
        queryKey: ['ways'],
        queryFn: async () => {
            return Promise.resolve(getWays());
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put way in api)
function useUpdateWay() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (way: Way) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newWayInfo: Way) => {
            queryClient.setQueryData(
                ['ways'],
                (prevWays: any) =>
                    prevWays?.map((prevWay: Way) =>
                        prevWay.id === newWayInfo.id ? newWayInfo : prevWay,
                    ),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['ways'] }), //refetch ways after mutation, disabled for demo
    });
}

//DELETE hook (delete way in api)
function useDeleteWay() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (wayId: string) => {
            return Promise.resolve(deleteById(wayId));
        },
        //client side optimistic update
        onMutate: (wayId: string) => {
            queryClient.setQueryData(
                ['ways'],
                (prevWays: any) =>
                    prevWays?.filter((way: Way) => way.id !== wayId),
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['ways'] }),
    });
}

const queryClient = new QueryClient();

const WaysWithProviders = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <ModalsProvider>
            <HeaderTabs />
            <Ways />
        </ModalsProvider>
    </QueryClientProvider>
);

export default WaysWithProviders;

function validateWay(way: Way) {
    console.log("validateWay")
    console.log(way)
    return {
        name: !validateRequired(way.name)
        ? 'Name is Required'
        : '',
        description: !validateRequired(way.description)
        ? 'Description is Required'
        : '',
        departureSettlement: !validateRequiredSettlement(way.departureSettlement)
        ? 'Departure Settlement is Required'
        : '',
        destinationSettlementId: !validateRequiredSettlement(way.destinationSettlement)
        ? 'Destination Settlement is Required'
        : '',
        roads: !validateRequiredRoads(way.roads)
        ? 'Roads are Required'
        : '',
    };
};

function validateWayIn(wayIn: WayIn) {
    console.log("validateWayIn")
    console.log(wayIn)
    return {
        name: !validateRequired(wayIn.name)
        ? 'Name is Required'
        : '',
        description: !validateRequired(wayIn.description)
        ? 'Description is Required'
        : '',
        departureSettlementId: !validateRequired(wayIn.departureSettlementId)
        ? 'Departure Settlement Id is Required'
        : '',
        destinationSettlementId: !validateRequired(wayIn.destinationSettlementId)
        ? 'Destination Settlement Id is Required'
        : '',
        roads: !validateRequiredRoadIds(wayIn.roadIds)
        ? 'Road IDs are Required'
        : '',
    };
};
