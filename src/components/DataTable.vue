<template>
    <div>
        <v-row>
            <v-col cols="3">
                <v-text-field label="search" v-model="search"></v-text-field>
            </v-col>
        </v-row>

        <v-data-table
            class="user-table"
            :headers="headers"
            :items="items"
            item-key="name"
            no-data-text="No data"
            no-results-text="No user found"
            :search="search"
            :loading="isLoading"
            @pagination="pagination"
        >
            <template v-slot:item="{item}">
                <tr>
                    <td data-cy="id">
                        <TextHighlight :text="item.id" :search="search" />
                    </td>
                    <td data-cy="firstName">
                        <TextHighlight
                            :text="item.firstName"
                            :search="search"
                        />
                    </td>
                    <td data-cy="lastName">
                        <TextHighlight :text="item.lastName" :search="search" />
                    </td>
                    <td data-cy="email">
                        <TextHighlight :text="item.email" :search="search" />
                    </td>
                    <td data-cy="address">
                        <TextHighlight :text="item.address" :search="search" />
                    </td>
                    <td class="actions-container">
                        <v-icon
                            class="table-actions"
                            @click="deleteUser(item.id)"
                            >mdi-delete</v-icon
                        >
                        <UserForm
                            :icon="true"
                            :userId="item.id"
                            :update="true"
                        />
                        <UserForm
                            :icon="true"
                            :userId="item.id"
                            :readonly="true"
                        />
                    </td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>

<script>
import UserForm from "./UserForm.vue";
import TextHighlight from "./TextHighlight.vue";
export default {
    name: "Table",
    components: {
        TextHighlight,
        UserForm,
    },
    props: {
        items: Array,
        headers: Array,
        isLoading: Boolean,
    },
    data() {
        return {
            search: null,
        };
    },
    methods: {
        pagination(p) {
            this.length = p.itemsLength;
        },
        deleteUser(id) {
            this.$emit("deleteByUserId", id);
        },
    },
};
</script>

<style>
.user-table .table-actions {
    cursor: pointer;
}
.user-table .actions-container {
    display: flex;
    align-items: center;
}
.user-table.theme--light.v-data-table
    > .v-data-table__wrapper
    > table
    > thead
    > tr
    > th {
    font-size: 11px;
    color: rgb(0 0 0);
    height: 30px;
    padding: 0 3px;
    text-align: left;
}
td {
    text-align: left;
}
.v-application--is-ltr .user-table .v-data-footer__select {
    margin-left: 0;
    margin-right: auto;
}
</style>
