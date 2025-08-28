import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { queryClient } from "@/router";
import { createTodo, deleteTodo, getTodos, toggleTodo } from "@/server/todo";

export const Route = createFileRoute("/todos")({
	component: TodosRoute,
});

function TodosRoute() {
	const [newTodoText, setNewTodoText] = useState("");
	const createTodoFn = useServerFn(createTodo);
	const getTodosFn = useServerFn(getTodos);
	const deleteTodoFn = useServerFn(deleteTodo);
	const toggleTodoFn = useServerFn(toggleTodo);

	const createTodoMutation = useMutation({
		mutationFn: createTodoFn,
		onSuccess: () => {
			setNewTodoText("");
			toast.success("Todo created successfully");
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
	});

	const todos = useQuery({
		queryKey: ["todos"],
		queryFn: getTodosFn,
	});

	const deleteTodoMutation = useMutation({
		mutationFn: deleteTodoFn,
		onSuccess: () => {
			toast.success("Todo deleted successfully");
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
	});

	const toggleTodoMutation = useMutation({
		mutationFn: toggleTodoFn,
		onSuccess: () => {
			toast.success("Todo toggled successfully");
			queryClient.invalidateQueries({ queryKey: ["todos"] });
		},
	});

	const handleAddTodo = (e: React.FormEvent) => {
		e.preventDefault();
		if (newTodoText.trim()) {
			createTodoMutation.mutate({ data: { description: newTodoText } });
		}
	};

	const handleToggleTodo = (id: string, completed: boolean) => {
		toggleTodoMutation.mutate({ data: { id, isCompleted: !completed } });
	};

	const handleDeleteTodo = (id: string) => {
		deleteTodoMutation.mutate({ data: { id } });
	};

	return (
		<div className="mx-auto w-full max-w-md py-10">
			<Card>
				<CardHeader>
					<CardTitle>Todo List</CardTitle>
					<CardDescription>Manage your tasks efficiently</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={handleAddTodo}
						className="mb-6 flex items-center space-x-2"
					>
						<Input
							value={newTodoText}
							onChange={(e) => setNewTodoText(e.target.value)}
							placeholder="Add a new task..."
							disabled={createTodoMutation.isPending}
						/>
						<Button
							type="submit"
							disabled={createTodoMutation.isPending || !newTodoText.trim()}
						>
							{createTodoMutation.isPending ? (
								<Loader2 className="h-4 w-4 animate-spin" />
							) : (
								"Add"
							)}
						</Button>
					</form>

					{todos.isLoading ? (
						<div className="flex justify-center py-4">
							<Loader2 className="h-6 w-6 animate-spin" />
						</div>
					) : todos.data?.length === 0 ? (
						<p className="py-4 text-center">No todos yet. Add one above!</p>
					) : (
						<ul className="space-y-2">
							{todos.data?.map((todo) => (
								<li
									key={todo.id}
									className="flex items-start justify-between rounded-md border p-3"
								>
									<div className="flex flex-1 items-start space-x-3">
										<Checkbox
											checked={todo.isCompleted}
											onCheckedChange={() =>
												handleToggleTodo(todo.id, todo.isCompleted)
											}
											id={`todo-${todo.id}`}
											className="mt-1"
										/>
										<div className="flex-1">
											<label
												htmlFor={`todo-${todo.id}`}
												className={`block cursor-pointer font-medium ${todo.isCompleted ? "line-through" : ""}`}
											>
												{todo.title}
											</label>
											{todo.description && (
												<p className="mt-1 text-gray-500 text-sm">
													{todo.description}
												</p>
											)}
										</div>
									</div>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => handleDeleteTodo(todo.id)}
										aria-label="Delete todo"
										disabled={deleteTodoMutation.isPending}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</li>
							))}
						</ul>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
