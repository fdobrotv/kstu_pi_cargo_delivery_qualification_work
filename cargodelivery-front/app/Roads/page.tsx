"use client"

import { useMemo, useState } from 'react';
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
    RoadIn,
} from "@/generated";

import { UUID } from 'crypto';
import { create, deleteById, getRoads } from './fetch';
import { validateRequired, validateRequiredDateInFuture, validateRequiredPoints } from '../Validators/validation';
import HeaderTabs from '../Menu/Menu';

const Roads = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    const columns = useMemo<MRT_ColumnDef<Road>[]>(
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
                accessorKey: 'path',
                header: 'Путь в формате GPX',
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
        ],
        [validationErrors],
    );

    //call CREATE hook
    const { mutateAsync: createRoad, isLoading: isCreatingRoad } =
        useCreateRoad();
    //call READ hook
    const {
        data: fetchedRoads = [],
        isError: isLoadingRoadsError,
        isFetching: isFetchingRoads,
        isLoading: isLoadingRoads,
    } = useGetRoads();
    //call UPDATE hook
    const { mutateAsync: updateRoad, isLoading: isUpdatingRoad } =
        useUpdateRoad();
    //call DELETE hook
    const { mutateAsync: deleteRoad, isLoading: isDeletingRoad } =
        useDeleteRoad();

    //CREATE action
    const handleCreateRoad: MRT_TableOptions<Road>['onCreatingRowSave'] = async ({
            values,
            exitCreatingMode,
        }) => {
        let roadIn: RoadIn = {
            name : values.name,
            description : values.description,
            path : values.path,
        }
        const newValidationErrors = validateRoadIn(roadIn);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createRoad(roadIn);
        exitCreatingMode();
    };

    //UPDATE action
    const handleSaveRoad: MRT_TableOptions<Road>['onEditingRowSave'] = async ({
            values,
            table,
        }) => {
        const newValidationErrors = validateRoad(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateRoad(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = (row: MRT_Row<Road>) =>
        modals.openConfirmModal({
            title: 'Are you sure you want to delete this road?',
            children: (
                <Text>
                    Are you sure you want to delete road 
                    {row.original.name} {' '} {row.original.description}
                    ? This action cannot be undone.
                </Text>
            ),
            labels: { confirm: 'Delete', cancel: 'Cancel' },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteRoad(row.original.id),
        });

    const table = useMantineReactTable({
        columns,
        data: fetchedRoads,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.id,
        mantineToolbarAlertBannerProps: isLoadingRoadsError
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
        onCreatingRowSave: handleCreateRoad,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveRoad,
        renderCreateRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Create New Road</Title>
                {internalEditComponents}
                <Flex justify="flex-end" mt="xl">
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </Flex>
            </Stack>
        ),
        renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Edit Road</Title>
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
                Create New Road
            </Button>
        ),
        state: {
            isLoading: isLoadingRoads,
            isSaving: isCreatingRoad || isUpdatingRoad || isDeletingRoad,
            showAlertBanner: isLoadingRoadsError,
            showProgressBars: isFetchingRoads,
        },
    });

    return <MantineReactTable table={table} />;
};

//CREATE hook (post new road to api)
function useCreateRoad() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (roadIn: RoadIn) => {
            return Promise.resolve(create(roadIn));
        },
        //client side optimistic update
        onMutate: (newRoadInfo: RoadIn) => {
            queryClient.setQueryData(
                ['roads'],
                (prevRoads: any) =>
                    [
                        ...prevRoads,
                        {
                            ...newRoadInfo,
                            // id: newRoadInfo.id,
                        },
                    ] as RoadIn[],
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['roads'] }),
    });
}

//READ hook (get roads from api)
export function useGetRoads() {
    console.log("useGetRoads")
    return useQuery<Array<Road>>({
        queryKey: ['roads'],
        queryFn: async () => {
            return Promise.resolve(getRoads());
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put road in api)
function useUpdateRoad() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (road: Road) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newRoadInfo: Road) => {
            queryClient.setQueryData(
                ['roads'],
                (prevRoads: any) =>
                    prevRoads?.map((prevRoad: Road) =>
                        prevRoad.id === newRoadInfo.id ? newRoadInfo : prevRoad,
                    ),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['roads'] }), //refetch roads after mutation, disabled for demo
    });
}

//DELETE hook (delete road in api)
function useDeleteRoad() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (roadId: string) => {
            return Promise.resolve(deleteById(roadId));
        },
        //client side optimistic update
        onMutate: (roadId: string) => {
            queryClient.setQueryData(
                ['roads'],
                (prevRoads: any) =>
                    prevRoads?.filter((road: Road) => road.id !== roadId),
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['roads'] }),
    });
}

const queryClient = new QueryClient();

const RoadsWithProviders = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <ModalsProvider>
            <HeaderTabs />
            <Roads />
        </ModalsProvider>
    </QueryClientProvider>
);

export default RoadsWithProviders;

function validateRoad(road: Road) {
    return {
        name: !validateRequired(road.name)
            ? 'Name is Required'
            : '',
        description: !validateRequired(road.description)
            ? 'Description is Required'
            : '',
        path: !validateRequiredPoints(road.path)
            ? 'Path is Required'
            : '',
    };
};

function validateRoadIn(roadIn: RoadIn) {
    console.log("validateRoadIn")
    console.log(roadIn)
    return {
        name: !validateRequired(roadIn.name)
            ? 'Name is Required'
            : '',
        description: !validateRequired(roadIn.description)
            ? 'Description is Required'
            : '',
        path: !validateRequiredPoints(roadIn.path)
            ? 'Path is Required'
            : '',
    };
};
