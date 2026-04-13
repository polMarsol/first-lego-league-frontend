import type { AuthStrategy } from "@/lib/authProvider";
import { Team } from "@/types/team";
import { User } from "@/types/user";
import { fetchHalCollection, fetchHalResource } from "./halClient";

export class TeamsService {
    constructor(private readonly authStrategy: AuthStrategy) {}

    async getTeams(): Promise<Team[]> {
        return fetchHalCollection<Team>('/teams', this.authStrategy, 'teams');
    }

    async getTeamById(id: string): Promise<Team> {
        const teamId = encodeURIComponent(decodeURIComponent(id));
        return fetchHalResource<Team>(`/teams/${teamId}`, this.authStrategy);
    }

    async getTeamCoach(id: string): Promise<User[]> {
        const teamId = encodeURIComponent(decodeURIComponent(id));
        return fetchHalCollection<User>(`/teams/${teamId}/trainedBy`, this.authStrategy, 'coaches').catch(() => []);
    }

    async getTeamMembers(id: string): Promise<User[]> {
        const teamId = encodeURIComponent(decodeURIComponent(id));
        return fetchHalCollection<User>(`/teams/${teamId}/members`, this.authStrategy, 'teamMembers').catch(() => []);
    }
}
