"use client"

import { useMemo, useState, useEffect } from 'react';
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
    Stack,
    Text,
    Title,
    Tooltip,
    TextInput
} from '@mantine/core';
import { ModalsProvider, modals } from '@mantine/modals';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Select } from '@mantine/core';
import {
    QueryClient,
    QueryClientProvider,
    useMutation,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query';
import {
    Point,
    Settlement,
    SettlementIn,
} from "@/generated";

import { UUID } from 'crypto';
import { create, deleteById, getSettlements } from './fetchSettlements';
import { validateRequired, validateRequiredPoint } from '../Validators/validation';
import HeaderTabs from '../Menu/Menu';

const Settlements = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    const columns = useMemo<MRT_ColumnDef<Settlement>[]>(
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
                header: 'Name',
                mantineEditTextInputProps: {
                    type: 'email',
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
                        if (isCreatingSettlement) {
                            table.setCreatingRow(row);
                        } else if (isUpdatingSettlement) {
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
    const { mutateAsync: createSettlement, isLoading: isCreatingSettlement } =
        useCreateSettlement();
    //call READ hook
    const {
        data: fetchedSettlements = [],
        isError: isLoadingSettlementsError,
        isFetching: isFetchingSettlements,
        isLoading: isLoadingSettlements,
    } = useGetSettlements();
    //call UPDATE hook
    const { mutateAsync: updateSettlement, isLoading: isUpdatingSettlement } =
        useUpdateSettlement();
    //call DELETE hook
    const { mutateAsync: deleteSettlement, isLoading: isDeletingSettlement } =
        useDeleteSettlement();

    //CREATE action
    const handleCreateSettlement: MRT_TableOptions<Settlement>['onCreatingRowSave'] = async ({
            values,
            exitCreatingMode,
        }) => {
        let settlementIn: SettlementIn = {
            name : values.name,
            coordinates : values.coordinates,
        }
        console.log("handleCreateSettlement");
        console.log("settlementIn " + settlementIn);
        const newValidationErrors = validateSettlementIn(settlementIn);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createSettlement(settlementIn);
        exitCreatingMode();
    };

    //UPDATE action
    const handleSaveSettlement: MRT_TableOptions<Settlement>['onEditingRowSave'] = async ({
            values,
            table,
        }) => {
        const newValidationErrors = validateSettlement(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateSettlement(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = (row: MRT_Row<Settlement>) =>
        modals.openConfirmModal({
            title: 'Are you sure you want to delete this settlement?',
            children: (
                <Text>
                    Are you sure you want to delete {row.original.name}
                    ? This action cannot be undone.
                </Text>
            ),
            labels: { confirm: 'Delete', cancel: 'Cancel' },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteSettlement(row.original.id),
        });

    const table = useMantineReactTable({
        columns,
        data: fetchedSettlements,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.id,
        mantineToolbarAlertBannerProps: isLoadingSettlementsError
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
        onCreatingRowSave: handleCreateSettlement,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveSettlement,
        renderCreateRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Create New Settlement</Title>
                {internalEditComponents}
                <Flex justify="flex-end" mt="xl">
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </Flex>
            </Stack>
        ),
        renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Edit Settlement</Title>
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
                    //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
                    //   }),
                    // );
                }}
            >
                Create New Settlement
            </Button>
        ),
        state: {
            isLoading: isLoadingSettlements,
            isSaving: isCreatingSettlement || isUpdatingSettlement || isDeletingSettlement,
            showAlertBanner: isLoadingSettlementsError,
            showProgressBars: isFetchingSettlements,
        },
    });

    return <MantineReactTable table={table} />;
};

//CREATE hook (post new settlement to api)
function useCreateSettlement() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (settlementIn: SettlementIn) => {
            return Promise.resolve(create(settlementIn));
        },
        //client side optimistic update
        onMutate: (newSettlementInfo: SettlementIn) => {
            console.log("useCreateSettlement onMutate");
            console.log("onMutate newSettlementInfo: " + newSettlementInfo);
            queryClient.setQueryData(
                ['settlements'],
                (prevSettlements: any) =>
                    [
                        ...prevSettlements,
                        {
                            ...newSettlementInfo,
                        },
                    ] as SettlementIn[],
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['settlements'] }),
    });
}

// function useCreateCar(): UseMutationResult<Car, Error, CarIn, void> {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: async (carIn: CarIn) => {
//             console.log("useCreateCar");
//             console.log("carIn: " + carIn);
//             let createCarRequest: CreateCarRequest = {carIn: carIn}
//             let createdCar: Promise<Car> = carsApi.createCar(createCarRequest);
//             return Promise.resolve(createdCar);
//         },
//         //client side optimistic update
//         onMutate: (newCarInfo: CarIn) => {
//             console.log("useCreateCar onMutate");
//             console.log("onMutate newCarInfo: " + newCarInfo);
//             queryClient.setQueryData(
//                 ['cars'],
//                 (prevCars: any) =>
//                     [
//                         ...prevCars,
//                         {
//                             ...newCarInfo,
//                             id: (Math.random() + 1).toString(36).substring(7),
//                         },
//                     ] as Car[],
//             );
//         },
//         onSettled: () => queryClient.invalidateQueries({ queryKey: ['cars'] }), //refetch car marks after mutation, disabled for demo
//     });
// }

//READ hook (get settlements from api)
export function useGetSettlements() {
    console.log("useGetSettlements")
    return useQuery<Array<Settlement>>({
        queryKey: ['settlements'],
        queryFn: async () => {
            return Promise.resolve(getSettlements());
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put settlement in api)
function useUpdateSettlement() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (settlement: Settlement) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newSettlementInfo: Settlement) => {
            queryClient.setQueryData(
                ['settlements'],
                (prevSettlements: any) =>
                    prevSettlements?.map((prevSettlement: Settlement) =>
                        prevSettlement.id === newSettlementInfo.id ? newSettlementInfo : prevSettlement,
                    ),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['settlements'] }), //refetch settlements after mutation, disabled for demo
    });
}

//DELETE hook (delete settlement in api)
function useDeleteSettlement() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (settlementId: string) => {
            return Promise.resolve(deleteById(settlementId));
        },
        //client side optimistic update
        onMutate: (settlementId: string) => {
            queryClient.setQueryData(
                ['settlements'],
                (prevSettlements: any) =>
                    prevSettlements?.filter((settlement: Settlement) => settlement.id !== settlementId),
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['settlements'] }),
    });
}

const queryClient = new QueryClient();

const SettlementsWithProviders = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <ModalsProvider>
            <HeaderTabs />
            <Settlements />
        </ModalsProvider>
    </QueryClientProvider>
);

export default SettlementsWithProviders;

function validateSettlement(settlement: Settlement) {
    return {
        name: !validateRequired(settlement.name)
            ? 'Name is Required'
            : '',
        coordinates: !validateRequiredPoint(settlement.coordinates)
            ? 'Coordinate point is Required'
            : '',
    };
};

function validateSettlementIn(settlementIn: SettlementIn) {
    console.log("validateSettlementIn")
    console.log(settlementIn)
    return {
        name: !validateRequired(settlementIn.name)
            ? 'Name is Required'
            : '',
        coordinates: !validateRequiredPoint(settlementIn.coordinates)
            ? 'Coordinate point is Required'
            : '',
    };
};
