<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { vAutoAnimate } from "@formkit/auto-animate/vue";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast/use-toast";
import { login } from "../../API/auth";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";

const { toast } = useToast();
const authStore = useAuthStore();

const formSchema = toTypedSchema(
  z.object({
    email: z.string().min(2).max(255).email("Must be a valid email"),
    password: z.string().min(8).max(50),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  const response = await login(values.email, values.password);
  if (response.data.success) {
    localStorage.setItem("authToken", response.data.data);
    authStore.setToken(response.data.data);
    router.push({ name: "Dashboard" });
    toast({
      description: response.data.message,
    });
  } else {
    toast({
      variant: "destructive",
      description: response.data.message,
    });
  }
});
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem v-auto-animate>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="example@example.com"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem v-auto-animate>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input
            type="password"
            placeholder="Password"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit"> Login </Button>
  </form>
</template>
