// FlightSchedule.cpp
// Member-function definitions for class SouthboundTimetable.
#include <iostream>
#include <iomanip>
#include <fstream>
#include "SouthboundTimetable.h" // SouthboundTimetable class definition

extern string departureTimes[ 37 ];

// SouthboundTimetable default constructor loads southbound timetable from the file "Southbound timetable.dat"
SouthboundTimetable::SouthboundTimetable()
{
   loadSouthboundTimetable();
}

// returns an iterator which points to the southbound train with the specified trainNumber
vector< Train >::iterator SouthboundTimetable::searchTrain(string trainNumber)
{
	vector<Train>::iterator it = southboundTimetable.begin();
	for (; it != southboundTimetable.end(); ++it)
		if (it->getTrainNumber() == trainNumber)
			return it;
}

// display timetables for 5 coming southbound trains with
// the departure time for the origin station >= departureTimes[ departureTime ],
// the departure time for the origin station != "-", and
// the departure time for the destination station != "-"
void SouthboundTimetable::displayComingTrains(int departureTime, int originStation, int destinationStation)
{
	int count = 0;
	for (int i = 0; i < southboundTimetable.size(); ++i)
	{
		if (count == 5) // display timetables for 5 coming southbound trains 
			break;

		if (southboundTimetable[i].getDepartureTimes(originStation) >= departureTimes[departureTime]
			&& southboundTimetable[i].getDepartureTimes(originStation) != "-"
			&& southboundTimetable[i].getDepartureTimes(destinationStation) != "-")
		{
			cout << setw(8) << southboundTimetable[i].getTrainNumber()
				<< setw(12) << southboundTimetable[i].getDepartureTimes(originStation)
				<< setw(9) << southboundTimetable[i].getDepartureTimes(destinationStation)
				<< endl;
			++count;
		}
	}
}
int SouthboundTimetable::getNumberOfTrains()
{
   return southboundTimetable.size();
}

// loads the southbound timetable from the file "Southbound timetable.dat"
void SouthboundTimetable::loadSouthboundTimetable()
{
	ifstream inSouthboundTimetable("Southbound timetable.dat", ios::in  | ios::binary);
	if (!inSouthboundTimetable)
	{
		cout << "\nThe Southbound timetable.dat does not exist! " << endl;
	}
	else
	{
		Train newSouthboundTimetable;
		inSouthboundTimetable.seekg(0);
		while (!inSouthboundTimetable.eof())
		{
			inSouthboundTimetable.read(reinterpret_cast<char *>(&newSouthboundTimetable), sizeof(Train));
			southboundTimetable.push_back(newSouthboundTimetable);
		}
	}
}