// MakingReservation.cpp
// Member-function definitions for class MakingReservation.
#include <iostream>
#include <iomanip>
#include "MakingReservation.h" // MakingReservation class definition

extern string departureTimes[ 37 ];

// MakingReservation constructor
MakingReservation::MakingReservation( ReservationDatabase &theReservationDatabase,
                                      SouthboundTimetable &theSouthboundTimetable,
                                      NorthboundTimetable &theNorthboundTimetable )
   : reservationDatabase( theReservationDatabase ),
     southboundTimetable( theSouthboundTimetable ),
     northboundTimetable( theNorthboundTimetable )
{
} // end MakingReservation constructor

void MakingReservation::execute()
{
   int departureTime;

   inputReservationDetails( departureTime );

   chooseTrain( departureTime ); // displays timetables for 5 coming trains, then let user choose a train

   inputContactPersonInfo();

   reservation.displayReservationDetails();

   reservationDatabase.addReservation( reservation );

   cout << "\nReservation Completed!\n\n";
}

// inputs originStation, destinationStation, carClass,
// date, departureTime, adultTickets and concessionTickets
void MakingReservation::inputReservationDetails(int &departureTime)
{
	string station[13] = { "" , "Nangang" , "Taipei" , "Banqiao" , "Taoyuan"
							 ,"Hsinchu" , "Miaoli" , "Taichung" , "Changhua"
							 , "Yunlin" , "Chiayi" , "Tainan" , "Zuoying" };
	string Carclass[3] = { "" , "Standard Car" , "Business Car" };

	char theUserdate[12]; // outbound date
	int theUseroriginStation; // the origin station code
	int theUserdestinationStation; // the destination station code
	int theUsercarClass; // the car class code; 1:standard car, 2:business car
	int theUseradultTickets; // the number of adult tickets
	int theUserconcessionTickets; // the number of concession tickets


	cout << "\nOrigin Station:" << endl;
	for (int i = 1; i < 13; ++i)
		cout << i << ". " << station[i] << endl;
	cout << "?";
	cin >> theUseroriginStation;

	cout << "\nDestination Station:" << endl;
	for (int i = 1; i < 13; ++i)
		cout << i << ". " << station[i] << endl;
	cout << "?";
	cin >> theUserdestinationStation;

	cout << "\nCar Class:" << endl;
	for (int i = 1; i <= 2; ++i)
		cout << i << ". " << Carclass[i] << endl;
	cout << "?";
	cin >> theUsercarClass;

	cout << "Departure Date: ";
	cin >> theUserdate;

	for (int i = 1; i < 37; ++i)
		cout << i << ". " << departureTimes[i] << endl;
	cout << "\nEnter Departure Time Code: ";
	cin >> departureTime;

	cout << "\nHow many adult tickets? ";
	cin >> theUseradultTickets;
	
	cout << "\nHow many concession tickets? ";
	cin >> theUserconcessionTickets;

	reservation.setOriginStation(theUseroriginStation);
	reservation.setDestinationStation(theUserdestinationStation);
	reservation.setDate(theUserdate);
	reservation.setCarClass(theUsercarClass);
	reservation.setAdultTickets(theUseradultTickets);
	reservation.setConcessionTickets(theUserconcessionTickets);
}

void MakingReservation::chooseTrain(int departureTime) // displays timetables for 5 coming trains, then let user choose a train
{
	cout << "Train No.  Departure  Arrival" << endl;
	if (reservation.getOriginStation() < reservation.getDestinationStation())
		southboundTimetable.displayComingTrains(departureTime, reservation.getOriginStation(), reservation.getDestinationStation());
	else
		northboundTimetable.displayComingTrains(departureTime, reservation.getOriginStation(), reservation.getDestinationStation());

	char TrainNumber[8];
	cout << "Enter Train Number: ";
	cin >> TrainNumber;
	reservation.setTrainNumber(TrainNumber);
}

// inputs idNumber and phone, and randomly generate reservationNumber
void MakingReservation::inputContactPersonInfo()
{
	char idNumber[12];
	char phone[12];
	char ReservationNumber[12];
	cout << "Enter Contact Person Information" << endl;
	cout << "ID Number: ";
	cin >> idNumber;
	cout << "\nPhone: ";
	cin >> phone;

	cout << "\nReservation Number: ";
	for (int i = 0; i < 8; ++i)
	{
		ReservationNumber[i] = rand() % 10 + '0';
		cout << ReservationNumber[i];
	}
	ReservationNumber[8] = '\0';

	cout << endl;
	reservation.setIdNumber(idNumber);
	reservation.setPhone(phone);
	reservation.setReservationNumber(ReservationNumber);
}