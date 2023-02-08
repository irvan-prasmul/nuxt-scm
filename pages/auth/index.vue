<template>
  <div
    class="d-flex align-center justify-center flex-column"
    style="height: 100vh"
  >
    <v-card
      width="600"
      class="mx-auto pa-4 overflow-auto"
      elevation="5"
      style="object-fit: cover"
    >
      <form @submit.prevent="submit">
        <v-row>
          <v-col cols="12">
            <img
              src="~/assets/logo-prasetiyamulya.png"
              class="d-flex mx-auto"
              style="width: 22%"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" class="text-center">
            <h5 style="color: #1d256a">SCM ONLINE</h5>
          </v-col>
        </v-row>
        <v-row class="px-9">
          <v-col>
            <v-text-field
              v-model="formLogin.email"
              :counter="255"
              :rules="emailRules"
              prepend-inner-icon="mdi-email"
              label="E-mail"
              variant="underlined"
            />
          </v-col>
          <v-col>
            <client-only>
              <v-select
                v-model="formLogin.emailSelect"
                :items="items"
                variant="underlined"
              />
            </client-only>
          </v-col>
        </v-row>

        <v-row class="px-9">
          <v-col>
            <v-text-field
              v-model="formLogin.password"
              :counter="255"
              :rules="passwordRules"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              required
              prepend-inner-icon="mdi-lock"
              label="Password"
              variant="underlined"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-col cols="10" class="pb-0">
            <v-btn
              class="me-4"
              theme="dark"
              rounded
              type="submit"
              :loading="isLoading"
              color="#1D256A"
              block
            >
              sign in
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-0 pl-0">
          <v-col cols="10">
            <v-btn
              class="pl-0"
              variant="plain"
              color="error"
              size="small"
              :loading="isLoading"
              style="text-transform: unset !important; font-style: italic"
            >
              Forgot Password?</v-btn
            >
          </v-col>
        </v-row>
        <v-row justify="center" class="mt-0">
          <v-col cols="4" class="py-0" align-self="center">
            <hr />
          </v-col>
          <v-col cols="auto" class="py-0">OR</v-col>
          <v-col cols="4" class="py-0" align-self="center">
            <hr />
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto" class="pt-1">
            <v-btn @click="azureLogin" :loading="isLoading" block color="info">
              <v-icon class="pr-1"> mdi-microsoft-azure </v-icon> Login with
              Azure
            </v-btn>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col cols="auto" class="pt-1">
            <p style="color: #039be5; font-size: 14px">
              Copyright @ Prasetiya Mulya
            </p>
          </v-col>
        </v-row>
      </form>
    </v-card>
    {{ auth.isAuth }} {{ auth.authToken }}
  </div>
</template>

<script lang="ts" setup>
const config = useRuntimeConfig();

const showPassword = ref(false);
const isLoading = ref(false);
const isError = ref(false);
const isForget = ref(false);

const errorMessage = ref("");

const valid = ref(true);
const emailRules = [(v: string) => !!v || "E-mail is required"];
const passwordRules = [(v: string) => !!v || "Password is required"];

const formLogin = reactive({
  emailSelect: "@prasetiyamulya.ac.id",
  email: "",
  password: "",
});

const items = ref(["@prasetiyamulya.ac.id", "@pmbs.ac.id"]);

// onMounted(() => {
//   textGlobal();
// });

const auth = useAuth();

const submit = async (event: any) => {
  await event;
  // alert(formLogin.email + formLogin.emailSelect);
  const { data, error } = await useFetch(() => `user/login`, {
    baseURL: config.public.apiBase,
    method: "POST",
    body: {
      email: formLogin.email + formLogin.emailSelect,
      password: formLogin.password,
    },
  });
  console.log("user", data);
  console.log("error", error);
  if (error.value != null) return;
  if (data.value != null) {
    auth.value.isAuth = true;
    const res: any = data.value;
    auth.value.authToken =
      typeof res.access_token == "string" ? res.access_token : "";
  }
};

const azureLogin = async () => {
  alert(formLogin.email + formLogin.emailSelect);
};

// return { name, phone, email, select, checkbox, items, submit, handleReset }
</script>

<style>
::-webkit-scrollbar {
  width: 4px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
