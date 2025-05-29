export type Destination = "Mumbai" | "Delhi" | "Bangalore" | "Goa" | "Jaipur";

type DestinationData = {
  [key in Destination]: {
    state: string;
    attractions: string[];
    flight: {
      economy: number;
      business: number;
    };
    train: number;
    bus: number;
    cab: number;
    hotel: {
      "3-star": number;
      "4-star": number;
      "5-star": number;
    };
  };
};

export const destinations: DestinationData = {
  Mumbai: {
    state: "Maharashtra",
    attractions: ["Gateway of India", "Marine Drive", "Juhu Beach", "Elephanta Caves"],
    flight: {
      economy: 5000,
      business: 15000
    },
    train: 2000,
    bus: 1500,
    cab: 3000,
    hotel: {
      "3-star": 3000,
      "4-star": 5000,
      "5-star": 8000
    }
  },
  Delhi: {
    state: "Delhi",
    attractions: ["Red Fort", "Qutub Minar", "India Gate", "Humayun's Tomb"],
    flight: {
      economy: 6000,
      business: 18000
    },
    train: 2500,
    bus: 1800,
    cab: 3500,
    hotel: {
      "3-star": 2800,
      "4-star": 4500,
      "5-star": 7500
    }
  },
  Bangalore: {
    state: "Karnataka",
    attractions: ["Lalbagh", "Cubbon Park", "MG Road", "Bangalore Palace"],
    flight: {
      economy: 5500,
      business: 16000
    },
    train: 2200,
    bus: 1600,
    cab: 3200,
    hotel: {
      "3-star": 2500,
      "4-star": 4000,
      "5-star": 7000
    }
  },
  Goa: {
    state: "Goa",
    attractions: ["Calangute Beach", "Fort Aguada", "Basilica of Bom Jesus", "Dudhsagar Falls"],
    flight: {
      economy: 7000,
      business: 20000
    },
    train: 3000,
    bus: 2000,
    cab: 4000,
    hotel: {
      "3-star": 3500,
      "4-star": 6000,
      "5-star": 10000
    }
  },
  Jaipur: {
    state: "Rajasthan",
    attractions: ["Hawa Mahal", "Amber Fort", "City Palace", "Jantar Mantar"],
    flight: {
      economy: 5800,
      business: 17000
    },
    train: 2300,
    bus: 1700,
    cab: 3300,
    hotel: {
      "3-star": 2700,
      "4-star": 4200,
      "5-star": 7200
    }
  }
};
