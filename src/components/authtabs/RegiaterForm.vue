<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { vAutoAnimate } from "@formkit/auto-animate/vue";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast/use-toast";
import { register } from "../../API/auth";
import router from "@/router";
import { useAuthStore } from "@/stores/auth";

const { toast } = useToast();
const authData = useAuthStore();

const formSchema = toTypedSchema(
  z
    .object({
      email: z.string().min(2).max(255).email("Must be a valid email"),
      name: z.string().min(3).max(50),
      password: z.string().min(8).max(50),
      confirm_password: z.string().min(8).max(50),
      role: z.string().min(1),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords must match",
      path: ["confirm_password"],
    })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  const response = await register(
    values.name,
    values.email,
    values.password,
    values.confirm_password,
    values.role
  );
  if (response.data.success) {
    localStorage.setItem("authToken", response.data.data);
    authData.setToken(response.data.data);
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
  <form class="space-y-2" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="role">
      <FormItem v-auto-animate>
        <FormControl>
          <Select id="role" v-bind="componentField">
            <SelectTrigger>
              <SelectValue placeholder="Select a Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                <SelectItem value="User"> User </SelectItem>
                <SelectItem value="Admin"> Admin </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="name">
      <FormItem v-auto-animate>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Name" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
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
    <FormField v-slot="{ componentField }" name="confirm_password">
      <FormItem v-auto-animate>
        <FormLabel>Confirm Password</FormLabel>
        <FormControl>
          <Input
            type="password"
            placeholder="Re Type Password"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit"> Register </Button>
  </form>
</template>
