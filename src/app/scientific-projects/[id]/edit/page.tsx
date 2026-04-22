import { ScientificProjectsService } from '@/api/scientificProjectApi';
import { UsersService } from '@/api/userApi';
import ErrorAlert from '@/app/components/error-alert';
import PageShell from '@/app/components/page-shell';
import { serverAuthProvider } from '@/lib/authProvider';
import { isAdmin } from '@/lib/authz';
import { fetchEditionFormData } from '@/app/scientific-projects/_fetch-edition-data';
import { AuthenticationError, NotFoundError, parseErrorMessage } from '@/types/errors';
import { redirect } from 'next/navigation';
import EditScientificProjectForm from './form';

export const dynamic = 'force-dynamic';

interface EditScientificProjectPageProps {
    readonly params: Promise<{ id: string }>;
}

export default async function EditScientificProjectPage(props: Readonly<EditScientificProjectPageProps>) {
    const { id } = await props.params;

    let error: string | null = null;

    let currentUser = null;
    try {
        currentUser = await new UsersService(serverAuthProvider).getCurrentUser();
    } catch (e) {
        if (e instanceof AuthenticationError) redirect('/login');
        error = parseErrorMessage(e);
    }

    if (!currentUser && !error) redirect('/login');
    if (currentUser && !isAdmin(currentUser)) redirect(`/scientific-projects/${id}`);

    let project = null;
    if (!error) {
        try {
            project = await new ScientificProjectsService(serverAuthProvider).getScientificProjectById(id);
        } catch (e) {
            error = e instanceof NotFoundError
                ? 'This scientific project does not exist.'
                : parseErrorMessage(e);
        }
    }

    const { editionOptions, teamsPerEdition } = await fetchEditionFormData(serverAuthProvider);

    const teamHref = project?.link('team')?.href ?? project?.team ?? '';
    const editionHref = project?.link('edition')?.href ?? project?.edition ?? '';
    const [name = '', ...rest] = (project?.comments ?? '').split('\n\n');
    const description = rest.join('\n\n');

    return (
        <PageShell
            eyebrow="Innovation project"
            title="Edit Scientific Project"
            description="Update the project's information."
        >
            {error && <ErrorAlert message={error} />}
            {project && !error && (
                <EditScientificProjectForm
                    projectId={id}
                    defaultValues={{ name, description, edition: editionHref, team: teamHref }}
                    editionOptions={editionOptions}
                    teamsPerEdition={teamsPerEdition}
                />
            )}
        </PageShell>
    );
}
