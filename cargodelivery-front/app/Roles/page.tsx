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
    Role,
    RoleIn,
} from "@/generated";

import { UUID } from 'crypto';
import { create, deleteById, getRoles } from './fetch';
import { validateRequired, validateRequiredDateInFuture } from '../Validators/validation';
import HeaderTabs from '../Menu/Menu';

const Roles = () => {
    const [validationErrors, setValidationErrors] = useState<
        Record<string, string | undefined>
    >({});

    const columns = useMemo<MRT_ColumnDef<Role>[]>(
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
                    //remove any previous validation errors when role focuses on the input
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
    const { mutateAsync: createRole, isLoading: isCreatingRole } =
        useCreateRole();
    //call READ hook
    const {
        data: fetchedRoles = [],
        isError: isLoadingRolesError,
        isFetching: isFetchingRoles,
        isLoading: isLoadingRoles,
    } = useGetRoles();
    //call UPDATE hook
    const { mutateAsync: updateRole, isLoading: isUpdatingRole } =
        useUpdateRole();
    //call DELETE hook
    const { mutateAsync: deleteRole, isLoading: isDeletingRole } =
        useDeleteRole();

    //CREATE action
    const handleCreateRole: MRT_TableOptions<Role>['onCreatingRowSave'] = async ({
            values,
            exitCreatingMode,
        }) => {
        let roleIn: RoleIn = {
            name : values.name,
        }
        const newValidationErrors = validateRoleIn(roleIn);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await createRole(roleIn);
        exitCreatingMode();
    };

    //UPDATE action
    const handleSaveRole: MRT_TableOptions<Role>['onEditingRowSave'] = async ({
            values,
            table,
        }) => {
        const newValidationErrors = validateRole(values);
        if (Object.values(newValidationErrors).some((error) => error)) {
            setValidationErrors(newValidationErrors);
            return;
        }
        setValidationErrors({});
        await updateRole(values);
        table.setEditingRow(null); //exit editing mode
    };

    //DELETE action
    const openDeleteConfirmModal = (row: MRT_Row<Role>) =>
        modals.openConfirmModal({
            title: 'Are you sure you want to delete this role?',
            children: (
                <Text>
                    Are you sure you want to delete role 
                    {row.original.name}
                    ? This action cannot be undone.
                </Text>
            ),
            labels: { confirm: 'Delete', cancel: 'Cancel' },
            confirmProps: { color: 'red' },
            onConfirm: () => deleteRole(row.original.id),
        });

    const table = useMantineReactTable({
        columns,
        data: fetchedRoles,
        createDisplayMode: 'modal', //default ('row', and 'custom' are also available)
        editDisplayMode: 'modal', //default ('row', 'cell', 'table', and 'custom' are also available)
        enableEditing: true,
        getRowId: (row) => row.id,
        mantineToolbarAlertBannerProps: isLoadingRolesError
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
        onCreatingRowSave: handleCreateRole,
        onEditingRowCancel: () => setValidationErrors({}),
        onEditingRowSave: handleSaveRole,
        renderCreateRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Создать новую роль</Title>
                {internalEditComponents}
                <Flex justify="flex-end" mt="xl">
                    <MRT_EditActionButtons variant="text" table={table} row={row} />
                </Flex>
            </Stack>
        ),
        renderEditRowModalContent: ({ table, row, internalEditComponents }) => (
            <Stack>
                <Title order={3}>Edit Role</Title>
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
                Создать новую роль
            </Button>
        ),
        state: {
            isLoading: isLoadingRoles,
            isSaving: isCreatingRole || isUpdatingRole || isDeletingRole,
            showAlertBanner: isLoadingRolesError,
            showProgressBars: isFetchingRoles,
        },
    });

    return <MantineReactTable table={table} />;
};

//CREATE hook (post new role to api)
function useCreateRole() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (roleIn: RoleIn) => {
            return Promise.resolve(create(roleIn));
        },
        //client side optimistic update
        onMutate: (newRoleInfo: RoleIn) => {
            queryClient.setQueryData(
                ['roles'],
                (prevRoles: any) =>
                    [
                        ...prevRoles,
                        {
                            ...newRoleInfo,
                            // id: newRoleInfo.id,
                        },
                    ] as RoleIn[],
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['roles'] }),
    });
}

//READ hook (get roles from api)
export function useGetRoles() {
    console.log("useGetRoles")
    return useQuery<Array<Role>>({
        queryKey: ['roles'],
        queryFn: async () => {
            return Promise.resolve(getRoles());
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put role in api)
function useUpdateRole() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (role: Role) => {
            //send api update request here
            await new Promise((resolve) => setTimeout(resolve, 1000)); //fake api call
            return Promise.resolve();
        },
        //client side optimistic update
        onMutate: (newRoleInfo: Role) => {
            queryClient.setQueryData(
                ['roles'],
                (prevRoles: any) =>
                    prevRoles?.map((prevRole: Role) =>
                        prevRole.id === newRoleInfo.id ? newRoleInfo : prevRole,
                    ),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['roles'] }), //refetch roles after mutation, disabled for demo
    });
}

//DELETE hook (delete role in api)
function useDeleteRole() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (roleId: string) => {
            return Promise.resolve(deleteById(roleId));
        },
        //client side optimistic update
        onMutate: (roleId: string) => {
            queryClient.setQueryData(
                ['roles'],
                (prevRoles: any) =>
                    prevRoles?.filter((role: Role) => role.id !== roleId),
            );
        },
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['roles'] }),
    });
}

const queryClient = new QueryClient();

const RolesWithProviders = () => (
    //Put this with your other react-query providers near root of your app
    <QueryClientProvider client={queryClient}>
        <ModalsProvider>
            <HeaderTabs />
            <Roles />
        </ModalsProvider>
    </QueryClientProvider>
);

export default RolesWithProviders;

function validateRole(role: Role) {
    return {
            name: !validateRequired(role.name)
            ? 'Name is Required'
            : '',
    };
};

function validateRoleIn(roleIn: RoleIn) {
    console.log("validateRoleIn")
    console.log(roleIn)
    return {
            name: !validateRequired(roleIn.name)
            ? 'Name is Required'
            : '',
    };
};
