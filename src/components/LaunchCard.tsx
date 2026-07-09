import { Card, Image, Text, Button, Group } from '@mantine/core';
import type { Launch } from '../api/spacex';

interface LaunchCardProps {
    launch: Launch;
    onSeeMore: (Launch: Launch) => void;
}

export function LaunchCard ({ launch, onSeeMore }: LaunchCardProps) {
    const { mission_name, rocket, links } = launch;
    const imageUrl = links.mission_patch_small || 'https://via.placeholder.com/100?text=No+Image';

    return (
        <Card shadow = 'sm' padding = 'md' radius = 'md' withBorder >
            <Card.Section style={{ paddingTop: 20 }}>
                <Image src={imageUrl} height={120} alt={mission_name} fit='contain' />
            </Card.Section>
            <Text fw = {500} size  = 'lg' mt = 'md'>
                {mission_name}
            </Text>
            <Text size = 'sm' c = 'dimmed'>
                Rocket: {rocket?.rocket_name || 'Unknown'}
            </Text>
            <Group justify = 'space-between' mt = 'md'>
                <Button variant = "blue" color = 'light' radius={10} fullWidth onClick = {() => onSeeMore(launch)}>
                    See more
                </Button>
            </Group>
        </Card>
    );
}