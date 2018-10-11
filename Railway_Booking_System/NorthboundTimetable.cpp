// NorthboundTimetable.cpp
// Member-function definitions for class NorthboundTimetable.
#include <iostream>
#include <iomanip>
#include <fstream>
#include "NorthboundTimetable.h" // NorthboundTimetable class definition

extern string departureTimes[ 37 ];

// NorthboundTimetable default constructor loads northbound timetable from the file "Northbound timetable.dat"
NorthboundTimetable::NorthboundTimetable()
{
   loadNorthboundTimetable();
}

int NorthboundTimetable::getNumberOfTrains()
{
   return northboundTimetable.size();
}

// returns an iterator which points to the northbound train with the specified trainNumber
vector< Train >::iterator NorthboundTimetable::searchTrain(string trainNumber)
{
	vector<Train>::iterator it = northboundTimetable.begin();
	for (; it != northboundTimetable.end(); ++it)
		if (it->getTrainNumber() == trainNumber)
			return it;
}

// display timetables for 5 coming northbound trains with
// the departure time for the origin station >= departureTimes[ departureTime ],
// the departure time for the origin station != "-", and
// the departure time for the destination station != "-"
void NorthboundTimetable::displayComingTrains(int departureTime, int originStation, int destinationStation)
{
	int count = 0;

	for (int i = 0; i < northboundTimetable.size(); ++i)
	{
		if (count == 5)// display timetables for 5 coming northbound trains 
			break;

		if (northboundTimetable[i].getDepartureTimes(originStation) >= departureTimes[departureTime]
			&& northboundTimetable[i].getDepartureTimes(originStation) != "-"
			&& northboundTimetable[i].getDepartureTimes(destinationStation) != "-")
		{
			cout << setw(8) << northboundTimetable[i].getTrainNumber()
				<< setw(12) << northboundTimetable[i].getDepartureTimes(originStation)
				<< setw(9) << northboundTimetable[i].getDepartureTimes(destinationStation)
				<< endl;
			++count;
		}
	}
}
// loads the northbound timetable from the file "Northbound timetable.dat"
void NorthboundTimetable::loadNorthboundTimetable()
{
	ifstream inNorthboundTimeFile("Northbound timetable.dat", ios::in | ios::binary);
	if (!inNorthboundTimeFile)
	{
		cout << "\nThe Northbound timetable.dat does not exist! " << endl;
	}
	else
	{
		Train newNorthboundTimetable;
		inNorthboundTimeFile.seekg(0);
		while (!inNorthboundTimeFile.eof())
		{
			inNorthboundTimeFile.read(reinterpret_cast<char *>(&newNorthboundTimetable), sizeof(Train));
			northboundTimetable.push_back(newNorthboundTimetable);
		}
	}
}