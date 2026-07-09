import { StrictMode } from "react";
import { Container, Grid, Loader, Text, Center } from "@mantine/core";
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { useLaunches } from "./hooks/useLaunches";
import { LaunchCard } from "./components/LaunchCard";
import { ModalPortal } from "./components/ModalPortal";
import { LaunchModalContent } from "./components/LaunchModalContent";

function AppContent() {
  const { state, selectLaunch, closeModal } = useLaunches();
  const { launches, loading, error, selectedLaunch } = state;

  if (loading) {
    return (
      <Center h="100vh">
        <Loader size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text c="red" size="lg">Error: {error}</Text>
      </Center>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Text fw={700} size="50px" mb="lg" ta="center">SpaceX launches</Text>
      <Grid>
        {Array.isArray(launches) && launches.length > 0 ? (
          launches.map((launch) => (
            <Grid.Col key={launch.flight_number} span={{ base: 12, sm: 6, md: 4 }}>
              <LaunchCard launch={launch} onSeeMore={selectLaunch} />
            </Grid.Col>
          ))
        ) : (
          <Text ta="center" size="lg" c="dimmed">Нет данных</Text>
        )}
      </Grid>

      <ModalPortal isOpen={!!selectedLaunch} onClose={closeModal}>
        {selectedLaunch && <LaunchModalContent launch={selectedLaunch} onClose={closeModal} />}
      </ModalPortal>
    </Container>
  );
}

export default function App() {
  return (
    <StrictMode>
      <MantineProvider>
        <AppContent />
      </MantineProvider>
    </StrictMode>
  );
}