<template>
    <v-app>
        <v-container>
            <div>
                <FormUser />
            </div>
            <DataTable
                :items="getUsers"
                :headers="headers"
                :isLoading="isLoading"
                @deleteByUserId="deleteByUserId"
            />
        </v-container>
    </v-app>
</template>

<script>
import DataTable from "./components/DataTable.vue";
import FormUser from "./components/UserForm.vue";
import {mapActions, mapGetters} from "vuex";
export default {
    name: "App",
    components: {
        DataTable,
        FormUser,
    },
    methods: {
        ...mapActions(["fetchUsers", "deleteUser"]),
        deleteByUserId(id) {
            console.log("id :>> ", id);
            this.deleteUser(id);
        },
    },
    computed: {
        ...mapGetters(["getUsers", "isLoading"]),

        headers() {
            return this.getUsers.length
                ? Object.keys(this.getUsers[0])
                      .map((el) => ({text: el, value: el}))
                      .concat({text: "actions", value: ""})
                : [];
        },
    },
    created() {
        this.fetchUsers();
    },
};
</script>

<style>
#app {
    padding: 10 px;
}
</style>
