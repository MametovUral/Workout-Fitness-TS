import { taskSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { useUserState } from "@/stores/user.store";

import { toast } from "sonner";
import FillLoading from "../shared/FillLoading";

interface Props {
  title?: string;
  isEdit?: boolean;
  onClose?: () => void;
  handler: (values: z.infer<typeof taskSchema>) => Promise<void | null>;
}

function TaskForm({ title = "", handler }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserState();

  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: { title },
  });

  async function onSubmit(values: z.infer<typeof taskSchema>) {
    if (!user) return null;

    setIsLoading(true);

    const promise = handler(values).finally(() => setIsLoading(false));

    toast.promise(promise, {
      loading: "Loading...",
      success: "Successfull",
      error: "Someting went wrong",
    });
  }
  return (
    <>
      {isLoading && <FillLoading />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter a task"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button className="h-12" type="submit" disabled={isLoading}>
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default TaskForm;
