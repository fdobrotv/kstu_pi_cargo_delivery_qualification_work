"use client"

import { FormEvent, FormEventHandler, useMemo, useState } from 'react';
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
    Group,
    Stack,
    Text,
    Title,
    Tooltip,
    rem
} from '@mantine/core';
import { ModalsProvider, modals } from '@mantine/modals';
import { IconEdit, IconPhoto, IconTrash, IconUpload, IconX } from '@tabler/icons-react';
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

import {Point as PointDTO} from "@/generated";

import { create, deleteById, getRoads } from './fetch';
import { validateRequired, validateRequiredPoints } from '../Validators/validation';
import HeaderTabs from '../Menu/Menu';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import gpxParser from 'gpxparser';

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
                Cell: ({ cell }) =>  {
                    let points = cell.getValue<PointDTO[]>();
                    let firstPoint: PointDTO = points[0];
                    return <Text>
                      {firstPoint.latitude} {" "} {firstPoint.longitude}
                    </Text>
                    },
                Edit: ({ cell, column, row, table }) => {
                    const [uploadedGPX, setUploadedGPX] = useState<any>()
                    const [points, setPoints] = useState<PointDTO[]>()

                    const onDrop = (files: FileWithPath[]) => {
                        console.log('accepted files', files)
                        console.log("handleChange");
                        console.log(files);
                        setUploadedGPX(files);

                        var gpx = new gpxParser();
                        let firstFile: FileWithPath = files[0];
                        console.log("firstFile " + firstFile);

                        let reader = new FileReader();

                        reader.onload = function (event) {
                            let fileText = event?.target?.result
                            console.log(typeof fileText);
                            if (fileText instanceof String) {
                                let casted = fileText as string;
                                let gpxParsed = gpx.parse(casted);
                                console.log("gpxParsed", gpxParsed);
                            }
                            if (typeof fileText === "string") {
                                let casted = fileText as string;
                                
                                let gpxParsed = gpx.parse(casted);
                                console.log("gpxParsed", gpxParsed);
                                var totalDistance = gpx.tracks[0].distance.total;
                                console.log("totalDistance", totalDistance);

                                var minElevation = gpx.tracks[0].elevation.min;
                                var maxElevation = gpx.tracks[0].elevation.max;
                                console.log("Elevation min max", minElevation, maxElevation);

                                let track = gpx.tracks[0];
                                console.log("track", track);

                                let point = track.points[0]
                                console.log("point", point);

                                let pointDTO: PointDTO = {
                                    latitude : point.lat,
                                    longitude :  point.lon,
                                }

                                console.log("pointDTO", pointDTO);

                                let pointDTOs: PointDTO[] = track.points.map(point => {
                                    let pointDTO: PointDTO = {
                                        latitude : point.lat,
                                        longitude :  point.lon,
                                    };
                                    return pointDTO;
                                })

                                setPoints(pointDTOs);

                                row._valuesCache[column.id] = pointDTOs
                                if (isCreatingRoad) {
                                    table.setCreatingRow(row);
                                } else if (isUpdatingRoad) {
                                    table.setEditingRow(row);
                                }
                            }
                            console.log("onload", fileText);
                            //holder.style.background = 'url(' + event.target.result + ') no-repeat center';
                            // 
                            
                        };

                        console.log(firstFile);
                        let fileText = reader.readAsText(firstFile);
                    }

                    return <Dropzone
                    onDrop={onDrop}
                    // onChange={onChange}
                    onReject={(files) => console.log('rejected files', files)}
                    maxSize={5 * 1024 ** 2}
                    // accept={["application/gpx", "application/gpx+xml"]}
                    // {...props}
                  >
                    <Group position="center" spacing="xl" style={{ minHeight: rem(220), pointerEvents: 'none' }}>
                      <Dropzone.Accept>
                        <IconUpload
                          size="3.2rem"
                          stroke={1.5}
                        //   color={theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6]}
                        />
                      </Dropzone.Accept>
                      <Dropzone.Reject>
                        <IconX
                          size="3.2rem"
                          stroke={1.5}
                        //   color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
                        />
                      </Dropzone.Reject>
                      <Dropzone.Idle>
                        <IconPhoto size="3.2rem" stroke={1.5} />
                      </Dropzone.Idle>
              
                      <div>
                        <Text size="xl" inline>
                          Перетащите GPX файл или кликните для выбора файла
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                          Прикрепите один файл, размер файла не должен превышать 5 мб
                        </Text>
                      </div>
                    </Group>
                  </Dropzone>;
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
                <Title order={3}>Создать новую дорогу</Title>
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
                Создать новую дорогу
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
