<template>
    <v-layout class="flex-row align-center flex-none modal-user-container">
        <v-flex cols="auto">
            <v-icon
                data-cy="update"
                class="mx-1 ma-2"
                v-if="icon && update"
                @click="getUser"
                >mdi-pencil</v-icon
            >
            <v-icon
                class="mx-1 ma-2"
                data-cy="readonly"
                v-else-if="icon && readonly"
                @click="getUser"
                >mdi-file-find</v-icon
            >
            <v-btn
                v-else
                @click="initForm"
                color="primary"
                class="ma-2 white--text text-capitalize mx-1"
            >
                <v-icon left> mdi-plus </v-icon>
                Add User
            </v-btn>

            <v-dialog
                transition="dialog-bottom-transition"
                max-width="600"
                v-model="dialog"
            >
                <v-card>
                    <v-toolbar color="primary" dark>{{
                        displayTitle
                    }}</v-toolbar>
                    <v-card-text class="mt-3">
                        <v-form v-model="validate">
                            <v-text-field
                                label="FirstName"
                                v-model="firstName"
                                :rules="rules.required"
                                :readonly="readonly"
                                data-cy="firstName"
                            ></v-text-field>

                            <v-text-field
                                label="LastName"
                                v-model="lastName"
                                :rules="rules.required"
                                :readonly="readonly"
                                data-cy="lastName"
                            ></v-text-field>

                            <v-text-field
                                v-model="email"
                                label="Email"
                                :rules="rules.email"
                                :readonly="readonly"
                                data-cy="email"
                            ></v-text-field>

                            <v-text-field
                                v-model="address"
                                label="Address"
                                :rules="rules.required"
                                :readonly="readonly"
                                data-cy="address"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                        <div v-if="!readonly">
                            <v-btn
                                text
                                v-if="update"
                                :disabled="!validate"
                                @click="handleSubmit"
                                data-cy="update-button"
                                >Update</v-btn
                            >
                            <v-btn
                                text
                                v-else
                                :disabled="!validate"
                                @click="handleSubmit"
                                >Save</v-btn
                            >
                        </div>
                        <v-btn text @click="dialog = false">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-flex>
    </v-layout>
</template>

<script>
import {mapActions} from "vuex";
import mapFields from "../utils/mapFields";
export default {
    name: "user-form",
    props: ["icon", "userId", "update", "readonly"],
    data() {
        return {
            validate: false,
            dialog: false,
            rules: {
                required: [(v) => !!v || "Field is required"],
                email: [
                    (v) => !!v || "Field is required",
                    (v) => /.+@.+/.test(v) || "Invalid Email",
                ],
            },
        };
    },
    computed: {
        ...mapFields(
            ["firstName", "lastName", "email", "address"],
            "getUser",
            "updateUserFields"
        ),
        displayTitle() {
            if (this.readonly) return "User Profile";
            if (this.update) return "Update User";
            return "Create User";
        },
    },
    methods: {
        ...mapActions([
            "createUser",
            "initFields",
            "getUserById",
            "updateUser",
        ]),

        initForm() {
            this.initFields();
            this.dialog = true;
        },
        getUser() {
            this.getUserById(this.userId);
            this.dialog = true;
        },
        handleSubmit() {
            if (this.update) {
                this.updateUser(this.userId);
            } else {
                this.createUser();
            }
            this.dialog = false;
        },
    },
};
</script>

<style>
.modal-user-container {
    flex: none !important;
}
</style>
