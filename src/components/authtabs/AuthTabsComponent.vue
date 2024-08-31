<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegiaterForm.vue";
</script>

<template>
  <Tabs default-value="login" class="w-[400px]">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="login"> Login </TabsTrigger>
      <TabsTrigger value="register"> Register </TabsTrigger>
    </TabsList>
    <TabsContent value="login">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Add your login credentials and Click Login when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <LoginForm />
        </CardContent>
      </Card>
    </TabsContent>
    <TabsContent value="register">
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription> Add Your Details to Register. </CardDescription>
        </CardHeader>
        <CardContent class="space-y-2">
          <RegisterForm />
        </CardContent>
      </Card>
    </TabsContent>
  </Tabs>
</template>
