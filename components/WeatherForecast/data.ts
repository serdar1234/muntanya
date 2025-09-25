const altMap = {
  pressure_950hPa: "500m",
  pressure_900hPa: "1000m",
  pressure_800hPa: "1900m",
  pressure_700hPa: "3km",
  pressure_600hPa: "4.2km",
  pressure_500hPa: "5.6km",
  pressure_400hPa: "7.2km",
};

const weatherData = [
  {
    date: "2024-04-27",
    times: [
      {
        label: "Morning",
        altitudes: [
          {
            height: 500,
            temperature: 15,
            windSpeed: 3,
            humidity: 80,
            cloudCoverage: 40,
          },
          {
            height: 1200,
            temperature: 10,
            windSpeed: 4,
            humidity: 70,
            cloudCoverage: 50,
          },
          {
            height: 2500,
            temperature: 5,
            windSpeed: 5,
            humidity: 60,
            cloudCoverage: 60,
          },
          {
            height: 7200,
            temperature: 0,
            windSpeed: 6,
            humidity: 50,
            cloudCoverage: 70,
          },
          {
            height: 3500,
            temperature: 7,
            windSpeed: 4.5,
            humidity: 55,
            cloudCoverage: 55,
          },
          {
            height: 4300,
            temperature: 6,
            windSpeed: 4.8,
            humidity: 52,
            cloudCoverage: 58,
          },
          {
            height: 6000,
            temperature: 2,
            windSpeed: 5.2,
            humidity: 45,
            cloudCoverage: 65,
          },
        ],
      },
      {
        label: "Day",
        altitudes: [
          {
            height: 500,
            temperature: 20,
            windSpeed: 2,
            humidity: 75,
            cloudCoverage: 30,
          },
          {
            height: 1200,
            temperature: 17,
            windSpeed: 3.5,
            humidity: 65,
            cloudCoverage: 35,
          },
          {
            height: 2500,
            temperature: 12,
            windSpeed: 4.2,
            humidity: 55,
            cloudCoverage: 45,
          },
          {
            height: 7200,
            temperature: 7,
            windSpeed: 5.1,
            humidity: 45,
            cloudCoverage: 55,
          },
          {
            height: 3500,
            temperature: 14,
            windSpeed: 3.8,
            humidity: 60,
            cloudCoverage: 40,
          },
          {
            height: 4300,
            temperature: 13,
            windSpeed: 4.0,
            humidity: 58,
            cloudCoverage: 42,
          },
          {
            height: 6000,
            temperature: 9,
            windSpeed: 4.9,
            humidity: 50,
            cloudCoverage: 50,
          },
        ],
      },
      {
        label: "Evening",
        altitudes: [
          {
            height: 500,
            temperature: 12,
            windSpeed: 2.5,
            humidity: 82,
            cloudCoverage: 45,
          },
          {
            height: 1200,
            temperature: 9,
            windSpeed: 3.8,
            humidity: 72,
            cloudCoverage: 55,
          },
          {
            height: 2500,
            temperature: 4,
            windSpeed: 4.5,
            humidity: 62,
            cloudCoverage: 65,
          },
          {
            height: 7200,
            temperature: -1,
            windSpeed: 6.2,
            humidity: 52,
            cloudCoverage: 75,
          },
          {
            height: 3500,
            temperature: 6,
            windSpeed: 4.2,
            humidity: 58,
            cloudCoverage: 60,
          },
          {
            height: 4300,
            temperature: 5,
            windSpeed: 4.4,
            humidity: 55,
            cloudCoverage: 62,
          },
          {
            height: 6000,
            temperature: 1,
            windSpeed: 5.0,
            humidity: 48,
            cloudCoverage: 68,
          },
        ],
      },
      {
        label: "Night",
        altitudes: [
          {
            height: 500,
            temperature: 8,
            windSpeed: 2.0,
            humidity: 85,
            cloudCoverage: 50,
          },
          {
            height: 1200,
            temperature: 5,
            windSpeed: 3.2,
            humidity: 75,
            cloudCoverage: 60,
          },
          {
            height: 2500,
            temperature: 0,
            windSpeed: 4.0,
            humidity: 65,
            cloudCoverage: 70,
          },
          {
            height: 7200,
            temperature: -4,
            windSpeed: 6.5,
            humidity: 55,
            cloudCoverage: 80,
          },
          {
            height: 3500,
            temperature: 3,
            windSpeed: 3.9,
            humidity: 68,
            cloudCoverage: 65,
          },
          {
            height: 4300,
            temperature: 2,
            windSpeed: 4.2,
            humidity: 66,
            cloudCoverage: 67,
          },
          {
            height: 6000,
            temperature: -1,
            windSpeed: 5.3,
            humidity: 58,
            cloudCoverage: 72,
          },
        ],
      },
    ],
  },
  // Add more days as needed
  {
    date: "2024-04-28",
    times: [
      // similar structure as above
    ],
  },
];

export default weatherData;
