import { createFileRoute } from "@tanstack/react-router";
import SignInForm from "@/components/sign-in-form";

export const Route = createFileRoute("/signin")({
	component: RouteComponent,
});

function RouteComponent() {
	return <SignInForm />;
}
