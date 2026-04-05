import { RecordService } from "@/api/recordApi";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/card";
import PageShell from "@/app/components/page-shell";
import ErrorAlert from "@/app/components/error-alert";
import { serverAuthProvider } from "@/lib/authProvider";
import { Record } from "@/types/record";
import { User } from "@/types/user";
import { parseErrorMessage, NotFoundError } from "@/types/errors";
import Link from "next/link";

interface RecordPageProps {
    readonly params: Promise<{ id: string }>;
}

export default async function RecordPage(props: Readonly<RecordPageProps>) {
    const recordService = new RecordService(serverAuthProvider);
    
    let record: Record | null = null;
    let owner: User | null = null;
    let error: string | null = null;
    let ownerError = false;

    try {
        record = await recordService.getRecordById((await props.params).id);
    } catch (e) {
        console.error("Failed to fetch record:", e);
        error = e instanceof NotFoundError 
            ? "This record does not exist." 
            : parseErrorMessage(e);
    }

    if (record && !error) {
        try {
            owner = await recordService.getRecordRelation<User>(record, "ownedBy");
        } catch (e) {
            console.error("Failed to fetch record owner:", e);
            ownerError = true;
        }
    }

    if (error) {
        return (
            <PageShell
                eyebrow="Record detail"
                title="Record not found"
                description="The record you're looking for could not be found."
            >
                <ErrorAlert message={error} />
            </PageShell>
        );
    }

    return (
        <PageShell
            eyebrow="Record detail"
            title="Record"
            description="View the published information associated with this record."
        >
            <Card className="w-full border-border/90">
                <CardHeader>
                    <div className="list-kicker">Record</div>
                    <CardTitle className="text-2xl">{record?.name}</CardTitle>
                    {record?.description && (
                        <CardDescription>{record.description}</CardDescription>
                    )}
                </CardHeader>
                <CardContent className="space-y-3">
                    {record?.created && (
                        <p className="text-sm text-muted-foreground">
                            Created: {new Date(record.created).toLocaleString()}
                        </p>
                    )}
                    {record?.modified && (
                        <p className="text-sm text-muted-foreground">
                            Last Modified: {new Date(record.modified).toLocaleString()}
                        </p>
                    )}
                    {owner && (
                        <>
                            <p className="text-sm text-muted-foreground">
                                Owner:{" "}
                                <Link
                                    href={`/users/${owner.username}`}
                                    className="font-semibold text-primary hover:underline"
                                >
                                    {owner.username}
                                </Link>
                            </p>
                            {owner.email && (
                                <p className="text-sm text-muted-foreground">
                                    Email: {owner.email}
                                </p>
                            )}
                        </>
                    )}
                    {!owner && ownerError && (
                        <p className="text-sm text-muted-foreground italic">
                            Owner information unavailable
                        </p>
                    )}
                </CardContent>
            </Card>
        </PageShell>
    );
}
