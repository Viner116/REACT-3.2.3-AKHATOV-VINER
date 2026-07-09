import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const mockLaunches = [
  {
    flight_number: 1,
    mission_name: 'Starlink 2',
    rocket: { rocket_name: 'Falcon 9' },
    links: { mission_patch_small: 'patch_small.jpg', mission_patch: 'patch.jpg' },
    details: 'Second batch of Starlink satellites.',
    launch_year: '2020',
  },
  {
    flight_number: 2,
    mission_name: 'CRS-20',
    rocket: { rocket_name: 'Falcon 9' },
    links: { mission_patch_small: null, mission_patch: null },
    details: null,
    launch_year: '2020',
  },
];

describe('App', () => {
  let fetchSpy: any;

  afterEach(() => {
    if (fetchSpy) fetchSpy.mockRestore();
  });

  it('отображает загрузку и затем список карточек', async () => {
    fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockLaunches,
    } as Response);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Starlink 2')).toBeInTheDocument();
      expect(screen.getByText('CRS-20')).toBeInTheDocument();
    });

    expect(screen.getAllByText(/Rocket: Falcon 9/i)).toHaveLength(2);
  });

  it('открывает модальное окно по клику на "See more"', async () => {
  fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
    ok: true,
    json: async () => mockLaunches,
  } as Response);

  const user = userEvent.setup();
  render(<App />);

  await waitFor(() => screen.getByText('Starlink 2'));
  const seeMoreButtons = await screen.findAllByText('See more');
  await user.click(seeMoreButtons[0]);

  expect(screen.getByRole('heading', { name: 'Starlink 2' })).toBeInTheDocument();
  expect(screen.getByText(/Second batch of Starlink satellites/i)).toBeInTheDocument();
  expect(screen.getAllByText('Rocket: Falcon 9')).toHaveLength(3); // ✅ исправлено
});

  it('закрывает модальное окно по клику на крестик', async () => {
    fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockLaunches,
    } as Response);

    const user = userEvent.setup();
    render(<App />);

    await waitFor(() => screen.getByText('Starlink 2'));
    const seeMoreButtons = await screen.findAllByText('See more');
    await user.click(seeMoreButtons[0]);

    expect(screen.getByRole('heading', { name: 'Starlink 2' })).toBeInTheDocument();

    const closeButton = screen.getByText('✕');
    await user.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: 'Starlink 2' })).not.toBeInTheDocument();
    });
  });

  it('отображает сообщение об ошибке при неудачном запросе', async () => {
    fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      statusText: 'Internal Server Error',
    } as Response);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Error: Failed to fetch launches/i)).toBeInTheDocument();
    });
  });
});