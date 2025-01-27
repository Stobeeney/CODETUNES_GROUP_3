import networkx as nx

class MetroGraph:
    def __init__(self):
        self.graph = nx.Graph()

    def add_station(self, station):
        self.graph.add_node(station)

    def add_connection(self, station1, station2, distance):
        self.graph.add_edge(station1, station2, weight=distance)

    def shortest_path(self, start_station, end_station):
        try:
            # Get basic shortest path
            path = nx.shortest_path(self.graph, source=start_station, target=end_station, weight='weight')
            distance = nx.shortest_path_length(self.graph, source=start_station, target=end_station, weight='weight')
            
            # Build complete path with all intermediate stations
            complete_path = []
            for i in range(len(path)-1):
                current = path[i]
                next_station = path[i+1]
                
                # Add current station if not already added
                if not complete_path or complete_path[-1] != current:
                    complete_path.append(current)
                
                # Check if this is a switch between lines
                edge = self.graph.get_edge_data(current, next_station)
                if edge:
                    # If this is not a switch (normal station connection)
                    if edge['weight'] >= 0.5:  # Regular station connections are typically >= 0.5km
                        complete_path.append(next_station)
                    else:  # This is a train switch
                        complete_path.append(next_station)
            
            # Add final station if not already in path
            if complete_path[-1] != path[-1]:
                complete_path.append(path[-1])
                
            return complete_path, distance
        except nx.NetworkXNoPath:
            return None, None

# Populate the graph with stations, distances, and train switches
def create_metro_graph():
    metro_graph = MetroGraph()

    # LRT 1 stations
    lrt1_distances = [
        ("Fernando Poe Jr", "Balintawak", 1.870),
        ("Balintawak", "Monumento", 2.250),
        ("Monumento", "5th Avenue", 1.087),
        ("5th Avenue", "R.Papa", 0.954),
        ("R.Papa", "Abad Santos", 0.660),
        ("Abad Santos", "Blumentritt", 0.927),
        ("Blumentritt", "Tayuman", 0.671),
        ("Tayuman", "Bambang", 0.618),
        ("Bambang", "Doroteo Jose", 0.648),
        ("Doroteo Jose", "Carriedo", 0.685),
        ("Carriedo", "Central Terminal", 0.725),
        ("Central Terminal", "United Nations", 1.214),
        ("United Nations", "Pedro Gil", 0.754),
        ("Pedro Gil", "Quirino Ave.", 0.794),
        ("Quirino Ave.", "Vito Cruz", 0.827),
        ("Vito Cruz", "Gil Puyat", 1.061),
        ("Gil Puyat", "Libertad", 0.730),
        ("Libertad", "EDSA", 1.010),
        ("EDSA", "Baclaran", 0.588),
        ("Baclaran", "Redemptorist-Aseana", 0.869),
        ("Redemptorist-Aseana", "MIA Road", 1.303),
        ("MIA Road", "PITX", 1.141),
        ("PITX", "Ninoy Aquino Avenue", 1.393),
        ("Ninoy Aquino Avenue", "Dr. Santos", 1.646),
    ]

    # LRT 2 stations
    lrt2_distances = [
        ("Antipolo", "Marikina-Pasig", 2.232),
        ("Marikina-Pasig", "Santolan", 1.795),
        ("Santolan", "Katipunan", 1.970),
        ("Katipunan", "Anonas", 0.955),
        ("Anonas", "Lrt 2-Araneta Center-Cubao", 1.438),
        ("Lrt 2-Araneta Center-Cubao", "Betty Go-Belmonte", 1.164),
        ("Betty Go-Belmonte", "Gilmore", 1.075),
        ("Gilmore", "J. Ruiz", 0.928),
        ("J. Ruiz", "V. Mapa", 1.234),
        ("V. Mapa", "Pureza", 1.357),
        ("Pureza", "Legarda", 1.389),
        ("Legarda", "Recto", 1.050),
    ]

    # MRT 3 stations
    mrt3_distances = [
        ("North Avenue", "Quezon Avenue", 1.200),
        ("Quezon Avenue", "GMA-Kamuning", 1.000),
        ("GMA-Kamuning", "Mrt 3-Araneta Center-Cubao", 1.900),
        ("Mrt 3-Araneta Center-Cubao", "Santolan-Annapolis", 1.500),
        ("Santolan-Annapolis", "Ortigas", 2.300),
        ("Ortigas", "Shaw Boulevard", 0.800),
        ("Shaw Boulevard", "Boni", 1.000),
        ("Boni", "Guadalupe", 0.800),
        ("Guadalupe", "Buendia", 2.000),
        ("Buendia", "Ayala", 0.950),
        ("Ayala", "Magallanes", 1.200),
        ("Magallanes", "Taft Avenue", 2.050),
    ]

    # train switches (Walking Distances)
    train_switches = [
        ("Mrt 3-Araneta Center-Cubao", "Lrt 2-Araneta Center-Cubao", 0.45),
        ("North Avenue", "Fernando Poe Jr", 1.7),
        ("Taft Avenue", "EDSA", 0.35),
        ("Recto", "Doroteo Jose", 0.25)
    ]

    # Add all stations and distances
    for station1, station2, distance in lrt1_distances + lrt2_distances + mrt3_distances + train_switches:
        metro_graph.add_station(station1)
        metro_graph.add_station(station2)
        metro_graph.add_connection(station1, station2, distance)

    return metro_graph
