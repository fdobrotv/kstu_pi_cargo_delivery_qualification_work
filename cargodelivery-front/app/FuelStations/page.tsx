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
    FuelStation,
    FuelStationIn,
    Point,
} from "@/generated";

import { create, deleteById, getFuelStations } from './fetch';
import { validateRequired, validateRequiredNumber, validateRequiredPoint } from '../Validators/validation';
import { UUID } from 'crypto';
import HeaderTabs from '../Menu/Menu';

const FuelStations = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    const columns = useMemo<MRT_ColumnDef<FuelStation>[]>(
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
                    //remove any previous validation errors when fuelStation focuses on the input
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
                    //remove any previous validation errors when fuelStation focuses on the input
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
                        if (isCreatingFuelStation) {
                            table.setCreatingRow(row);
                        } else if (isUpdatingFuelStation) {
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
    const { mutateAsync: createFuelStation, isLoading: isCreatingFuelStation } =
        useCreateFuelStation();
    //call READ hook
    const {
        data: fetchedFuelStations = [],
        isError: isLoadingFuelStationsError,
        isFetching: isFetchingFuelStations,
        isLoading: isLoadingFuelStations,
    } = useGetFuelStations();
    //call UPDATE hook
    const { mutateAsync: updateFuelStation, isLoading: isUpdatingFuelStation } =
        useUpdateFuelStation();
    //call DELETE hook
    const { mutateAsync: deleteFuelStation, isLoading: isDeletingFuelStation } =
        useDeleteFuelStation();

    //CREATE action
    const handleCreateFuelStation: MRT_TableOptions<FuelStation>['onCreatingRowSave'] = async ({
            values,
            exitCreatingMode,
        }) => {
        let fuelStationIn: FuelStationIn = {
            name : values.name,
            description : values.description,
            coordinates : values.coordinates,
        }
        console.log("handleCreateFuelStation");
        console.log(fuelStationIn);
        const newValidationErrors = validateFuelStationIn(fuelStationIn);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createFuelStation(fuelStationIn);
        exitCreatingMode();
    };

    //UPDATE action
    const handleSaveFuelStation: MRT_TableOptions<FuelStation>['onEditingRowSave'] = async ({
            values,
            table,
        }) => {
        const newValidationErrors = validateFuelStation(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateFuelStation(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = (row: MRT_Row<FuelStation>) =>
        modals.openConfirmModal({
            title: 'Are you sure you want to delete this fuelStation?',
            children: (
                <Text>
                    Are you sure you want to delete fuelStation 
                    {row.original.name} {' '} {row.original.description}
                    ? This action cannot be undone.
                </Text>
            ),
            labels: { confirm: 'Delete', cancel: 'Cancel' },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteFuelStation(row.original.id),
        });

    const table = useMantineReactTable({
        columns,
        data: fetchedFuelStations,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.id,
        mantineToolbarAlertBannerProps: isLoadingFuelStationsError
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
        onCreatingRowSave: handleCreateFuelStation,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveFuelStation,
        renderCreateRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Создать новую АЗС</Title>
                {internalEditComponents}
                <Flex justify="flex-end" mt="xl">
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </Flex>
            </Stack>
        ),
        renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Edit FuelStation</Title>
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
                Создать новую АЗС
            </Button>
        ),
        state: {
            isLoading: isLoadingFuelStations,
            isSaving: isCreatingFuelStation || isUpdatingFuelStation || isDeletingFuelStation,
            showAlertBanner: isLoadingFuelStationsError,
            showProgressBars: isFetchingFuelStations,
        },
    });

    return <MantineReactTable table={table} />;
};

//CREATE hook (post new fuelStation to api)
function useCreateFuelStation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (fuelStationIn: FuelStationIn) => {
            return Promise.resolve(create(fuelStationIn));
        },
        //client side optimistic update
        onMutate: (newFuelStationInfo: FuelStationIn) => {
            queryClient.setQueryData(
                ['fuelStations'],
                (prevFuelStations: any) =>
                    [
                        ...prevFuelStations,
                        {
                            ...newFuelStationInfo,
                            // id: newFuelStationInfo.id,
                        },
                    ] as FuelStationIn[],
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['fuelStations'] }),
    });
}

//READ hook (get fuelStations from api)
export function useGetFuelStations() {
    console.log("useGetFuelStations")
    return useQuery<Array<FuelStation>>({
        queryKey: ['fuelStations'],
        queryFn: async () => {
            return Promise.resolve(getFuelStations());
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put fuelStation in api)
function useUpdateFuelStation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (fuelStation: FuelStation) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newFuelStationInfo: FuelStation) => {
            queryClient.setQueryData(
                ['fuelStations'],
                (prevFuelStations: any) =>
                    prevFuelStations?.map((prevFuelStation: FuelStation) =>
                        prevFuelStation.id === newFuelStationInfo.id ? newFuelStationInfo : prevFuelStation,
                    ),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['fuelStations'] }), //refetch fuelStations after mutation, disabled for demo
    });
}

//DELETE hook (delete fuelStation in api)
function useDeleteFuelStation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (fuelStationId: string) => {
            return Promise.resolve(deleteById(fuelStationId));
        },
        //client side optimistic update
        onMutate: (fuelStationId: string) => {
            queryClient.setQueryData(
                ['fuelStations'],
                (prevFuelStations: any) =>
                    prevFuelStations?.filter((fuelStation: FuelStation) => fuelStation.id !== fuelStationId),
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['fuelStations'] }),
    });
}

const queryClient = new QueryClient();

const FuelStationsWithProviders = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <ModalsProvider>
            <HeaderTabs />
            <FuelStations />
        </ModalsProvider>
    </QueryClientProvider>
);

export default FuelStationsWithProviders;

function validateFuelStation(fuelStation: FuelStation) {
    return {
        name: !validateRequired(fuelStation.name)
            ? 'FuelStation name is Required'
            : '',
            description: !validateRequired(fuelStation.description)
            ? 'Description is Required'
            : '',
            coordinates: !validateRequiredPoint(fuelStation.coordinates)
            ? 'Coordinates are Required'
            : '',
    };
};

function validateFuelStationIn(fuelStationIn: FuelStationIn) {
    console.log("validateFuelStationIn")
    console.log(fuelStationIn)
    return {
        name: !validateRequired(fuelStationIn.name)
            ? 'FuelStation name is Required'
            : '',
            description: !validateRequired(fuelStationIn.description)
            ? 'Description is Required'
            : '',
            coordinates: !validateRequiredPoint(fuelStationIn.coordinates)
            ? 'Coordinates are Required'
            : '',
    };
};
