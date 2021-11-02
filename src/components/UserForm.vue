<template>
    <v-layout class="flex-row align-center flex-none modal-user-container">
        <v-flex cols="auto">
            <v-dialog transition="dialog-bottom-transition" max-width="600">
                <template v-slot:activator="{on, attrs}">
                    <v-icon
                        class="mx-1 ma-2"
                        v-if="icon && update"
                        v-bind="attrs"
                        v-on="on"
                        @click="getUserById(userId)"
                        >mdi-pencil</v-icon
                    >
                    <v-icon
                        class="mx-1 ma-2"
                        v-bind="attrs"
                        v-on="on"
                        v-else-if="icon && readonly"
                        @click="getUserById(userId)"
                        >mdi-file-find</v-icon
                    >
                    <v-btn
                        v-else
                        v-bind="attrs"
                        v-on="on"
                        @click="initFields"
                        color="primary"
                        class="ma-2 white--text text-capitalize mx-1"
                    >
                        <v-icon left> mdi-plus </v-icon>
                        Add User
                    </v-btn>
                </template>
                <template v-slot:default="dialog">
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
                                    data-firstName
                                ></v-text-field>

                                <v-text-field
                                    label="LastName"
                                    v-model="lastName"
                                    :rules="rules.required"
                                    :readonly="readonly"
                                ></v-text-field>

                                <v-text-field
                                    v-model="email"
                                    label="Email"
                                    :rules="rules.email"
                                    :readonly="readonly"
                                ></v-text-field>

                                <v-text-field
                                    v-model="address"
                                    label="Address"
                                    :rules="rules.required"
                                    :readonly="readonly"
                                ></v-text-field>
                            </v-form>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                            <template v-if="!readonly">
                                <v-btn
                                    text
                                    v-if="update"
                                    :disabled="!validate"
                                    @click="
                                        updateUser(userId),
                                            (dialog.value = false)
                                    "
                                    >Update</v-btn
                                >
                                <v-btn
                                    text
                                    v-else
                                    :disabled="!validate"
                                    @click="
                                        createUser(), (dialog.value = false)
                                    "
                                    >Save</v-btn
                                >
                            </template>
                            <v-btn text @click="dialog.value = false"
                                >Close</v-btn
                            >
                        </v-card-actions>
                    </v-card>
                </template>
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
    },
};
</script>

<style>
.modal-user-container {
    flex: none !important;
}
</style>
