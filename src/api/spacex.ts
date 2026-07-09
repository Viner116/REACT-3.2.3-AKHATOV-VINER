export interface Launch {
    flight_number: number;
    mission_name: string;
    rocket: {
        rocket_name: string;
    };
links: {
    mission_patch_small: string | null;
    mission_patch: string | null;
};
details: string;
launch_year: string;
}

export async function fetchLaunches(): Promise<Launch[]> {
    const response = await fetch('https://kata-spacex.onrender.com/api/launches');
    if (!response.ok) {
        throw new Error(`Failed to fetch launches: ${response.statusText}`);
    }
    const data = await response.json();
    return data.launches;    
}