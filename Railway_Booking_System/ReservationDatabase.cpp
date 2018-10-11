// ReservationDatabase.cpp
// Member-function definitions for class ReservationDatabase.
#include <iostream>
#include <fstream>
using namespace std;
#include "ReservationDatabase.h" // ReservationDatabase class definition

// ReservationDatabase default constructor loads reservations from the file Reservation details.dat
ReservationDatabase::ReservationDatabase()
{
   loadReservations();
}

// ReservationDatabase destructor stores reservations into the file Reservation details.dat
ReservationDatabase::~ReservationDatabase()
{
   storeReservations();
}

// returns an iterator which points to a Reservation object with specified idNumber and reservationNumber
vector< Reservation >::iterator ReservationDatabase::searchReservation(string idNumber, string reservationNumber)
{
	vector< Reservation >::iterator it = reservations.begin();
	for (; it != reservations.end(); ++it )
		if (it->getIdNumber() == idNumber && it->getReservationNumber() == reservationNumber)
			return it;
	return NULL;
}

vector< Reservation >::iterator ReservationDatabase::end()
{
   return reservations.end();
}

void ReservationDatabase::displayReservation( vector< Reservation >::iterator it )
{
   it->displayReservationDetails();
}

// cancels the Reservation object pointed by it
void ReservationDatabase::cancelReservation(vector< Reservation >::iterator it)
{
	vector< Reservation >::iterator it2 = it;
	vector< Reservation >::iterator temp;
	++it2;
	for (; it2 != reservations.end(); ++it, ++it2)
	{
		*temp = *it2;
		*it2 = *it;
		*it = *temp;
	}
	
	reservations.pop_back();
}

void ReservationDatabase::addReservation( Reservation reservation )
{
   reservations.push_back( reservation );
}

void ReservationDatabase::reduceSeats(vector< Reservation >::iterator it)
{
	int adultTickets;
	int concessionTickets;

	do
	{
		cout << "How many adult tickets to cancel¡H";
		cin >> adultTickets;
	} while (adultTickets > it->getAdultTickets() || adultTickets < 0);

	do
	{
		cout << "How many concession tickets to cancel¡H";
		cin >> concessionTickets;
	} while (concessionTickets > it->getConcessionTickets() || concessionTickets < 0);

	it->setAdultTickets(adultTickets);
	it->setConcessionTickets(concessionTickets);
}

// loads train reservations from the file Reservation details.dat
void ReservationDatabase::loadReservations()
{
	ifstream inReservationFile("Reservation details.dat", ios::in | ios::binary);
	if (!inReservationFile)
	{
		cout << "The Reservation details.dat does not exist!" << endl;
		//exit(1);
	}
	else
	{
		Reservation newReservation;
		while (!inReservationFile.eof())
		{
			inReservationFile.read(reinterpret_cast<char *>(&newReservation) , sizeof(Reservation));
			reservations.push_back(newReservation);
		}
	}
}

// stores train reservations into the file Reservation details.dat
void ReservationDatabase::storeReservations()
{
	fstream ioReservationFile("Reservation details.dat", ios::in | ios::out | ios::binary);
	if (!ioReservationFile)
	{
		ofstream outReservationFile("Reservation details.dat", ios::out | ios::binary);
		for (int i = 0; i < reservations.size(); ++i)
			outReservationFile.write(reinterpret_cast<char *>(&reservations[i]), sizeof(Reservation));
	}
	else
	{
		for (int i = 0; i < reservations.size(); ++i)
			ioReservationFile.write(reinterpret_cast<char *>(&reservations[i]), sizeof(Reservation));
	}
}