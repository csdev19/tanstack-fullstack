import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { getPrivateData } from "@/server/todo";

export const Route = createFileRoute("/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = Route.useNavigate();
	const { data: session, isPending } = authClient.useSession();

	const privateDataFn = useServerFn(getPrivateData);
	const privateData = useQuery({
		queryKey: ["privateData"],
		queryFn: privateDataFn,
	});

	useEffect(() => {
		if (!session && !isPending) {
			navigate({
				to: "/signin",
			});
		}
	}, [session, isPending, navigate]);

	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome {session?.user.name}</p>
			<p>privateData: </p>
			<pre>{JSON.stringify(privateData.data, null, 2)}</pre>
		</div>
	);
}
