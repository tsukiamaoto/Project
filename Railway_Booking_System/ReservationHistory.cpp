#include <iostream>
#include "ReservationHistory.h" // ReservationHistory class definition

// ReservationHistory default constructor
ReservationHistory::ReservationHistory( ReservationDatabase &theReservationDatabase,
                                        SouthboundTimetable &theSouthboundTimetable,
                                        NorthboundTimetable &theNorthboundTimetable )
   : reservationDatabase( theReservationDatabase ),
     southboundTimetable( theSouthboundTimetable ),
     northboundTimetable( theNorthboundTimetable )
{
} // end ReservationHistory default constructor

// perform the operation
void ReservationHistory::execute()
{
	cout << "Enter ID Number: ";
	cin >> idNumber;
	cout << "Enter Reservation Number: ";
	cin >> reservationNumber;
	vector<Reservation>::iterator &reservationHistory = reservationDatabase.searchReservation(idNumber, reservationNumber);
	if (reservationHistory == NULL)
		cout << "\nReservation record does not found!" << endl;
	else
	{
		reservationHistory->displayReservationDetails();

		int choice;
		while ((choice = enterChoice()) != 3)
		{
			switch (choice)
			{
			case 1:
				reservationDatabase.cancelReservation(reservationHistory);
				reservationHistory->displayReservationDetails();
				cout << "\nReservation Cancelled!" << endl;
				break;
			case 2:
				reservationDatabase.reduceSeats(reservationHistory);
				reservationHistory->displayReservationDetails();
				cout << "\nYou have successfully reduced the number of tickets!" << endl;
				break;
			default:
				cerr << "Incorrect Choice" << endl;
				break;
			}

			if (choice == 1)
				return;
		}
	}
}

int ReservationHistory::enterChoice()
{
   cout << "\nEnter Your Choice\n"
      << "1. Cancellation\n"
      << "2. Reduce\n"
      << "3. Back to Main Menu\n? ";

   int menuChoice;
   cin >> menuChoice;
   return menuChoice;
}