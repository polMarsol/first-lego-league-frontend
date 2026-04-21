'use client';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { TeamsService } from '@/api/teamApi';
import { clientAuthProvider } from '@/lib/authProvider';
import { MAX_TEAM_MEMBERS, TeamMember, TeamMemberSnapshot } from '@/types/team';

function toTeamMemberSnapshot(member: TeamMember | TeamMemberSnapshot): TeamMemberSnapshot {
    const selfHref = typeof (member as TeamMember).link === 'function'
        ? (member as TeamMember).link("self")?.href
        : undefined;

    return {
        id: member.id,
        name: member.name,
        birthDate: member.birthDate,
        gender: member.gender,
        tShirtSize: member.tShirtSize,
        role: member.role,
        uri: member.uri ?? selfHref,
    };
}

export function useTeamMembers(teamId: string, initialMembers: TeamMemberSnapshot[] = []) {
    const [members, setMembers] = useState<TeamMemberSnapshot[]>(() =>
        initialMembers.map(toTeamMemberSnapshot)
    );
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const service = useMemo(
        () => new TeamsService(clientAuthProvider),
        []
    );

    useEffect(() => {
        setMembers(initialMembers.map(toTeamMemberSnapshot));
    }, [initialMembers]);

    const addMember = useCallback(
        async (name: string, role: string) => {
            if (!teamId) {
                setError('Missing teamId');
                return false;
            }
            setIsLoading(true);
            setError(null);
            try {
                if (members.length >= MAX_TEAM_MEMBERS) {
                    setError('Team has reached maximum members');
                    return false;
                }
                const newMember = await service.addTeamMember(teamId, {
                    name,
                    role,
                });
                setMembers(prev => [...prev, toTeamMemberSnapshot(newMember)]);
                return true;
            } catch {
                setError('Failed to add member');
                return false;
            } finally {
                setIsLoading(false);
            }
        },
        [teamId, members.length, service]
    );

    const removeMember = useCallback(
        (memberUri: string) => {
            if (!memberUri) return;
            setMembers(prev => prev.filter(m => m.uri !== memberUri));
        },
        []
    );

    return {
        members: members ?? [],
        isLoading,
        error,
        addMember,
        removeMember,
        isFull: (members ?? []).length >= MAX_TEAM_MEMBERS,
    };
}
