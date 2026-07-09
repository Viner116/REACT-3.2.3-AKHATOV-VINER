import { Stack, Image, Title, Text, Button, Group } from '@mantine/core';
import type { Launch } from '../api/spacex';

interface LaunchModalContentProps {
    launch: Launch;
    onClose: () => void;
}

export function LaunchModalContent({ launch, onClose }: LaunchModalContentProps) {
    const { mission_name, rocket, links, details } = launch;
    const patchImage = links.mission_patch || 'https://via.placeholder.com/300?text=No+Image';

    return (
        <Stack gap='md'>
        <Group justify='space-between' align='flex-start'>
            <Title order={2}>{mission_name}</Title>
            <Button variant="subtle" onClick={onClose}>✕</Button>
        </Group>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Image
            src={patchImage} 
            width={200} 
            height={200}
            fit="contain"
            alt={mission_name} 
        />
        </div> 
        <Text fw={500}>Rocket: {rocket?.rocket_name || 'Unknown'}</Text>
        <Text>{details || 'No additional details available for this mission.'}</Text>  
        </Stack>
    );
}