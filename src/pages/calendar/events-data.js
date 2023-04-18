const events = [
  {
    // yyyy, mm, dd, hh, mm
    date: new Date(2023, 2, 25, 16, 17),
    // (hh) * mm * ss * ms
    duration: 60 * 60 * 1000,
    description: 'Descrizione primo evento',
    title: 'Primo evento',
  },
  {
    date: new Date(2023, 3, 25, 13, 45),
    duration: 2 * 60 * 60 * 1000,
    title: 'Secondo evento',
    description: 'Descrizione secondo evento',
  },
  {
    date: new Date(2023, 4, 8, 9, 20),
    duration: 20 * 60 * 1000,
    title: 'Terzo evento',
    description: 'Descrizione terzo evento',
  },
]

export default events
