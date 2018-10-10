// Reservation.cpp
// Member-function definitions for class Reservation.
#include <iostream>
#include <iomanip>
#include "SouthboundTimetable.h" // SouthboundTimetable class definition
#include "NorthboundTimetable.h" // NorthboundTimetable class definition
#include "Reservation.h" // Reservation class definition

int adultTicketPrice[ 13 ][ 13 ] = {
   0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,    0,
   0,    0,    0,    0,  400,  560,  735, 1060, 1205, 1325, 1500, 1830, 2000,
   0,   40,    0,    0,  350,  510,  680, 1000, 1140, 1280, 1455, 1780, 1950,
   0,   70,   40,    0,  320,  470,  640,  965, 1110, 1240, 1420, 1740, 1910,
   0,  200,  160,  130,    0,  320,  495,  805,  965, 1095, 1260, 1590, 1760,
   0,  330,  290,  260,  130,    0,  325,  655,  805,  925, 1110, 1430, 1600,
   0,  480,  430,  400,  280,  140,    0,  485,  630,  760,  925, 1260, 1430,
   0,  750,  700,  670,  540,  410,  270,    0,  320,  440,  615,  940, 1110,
   0,  870,  820,  790,  670,  540,  390,  130,    0,  295,  460,  800,  965,
   0,  970,  930,  900,  780,  640,  500,  230,  110,    0,  340,  660,  830,
   0, 1120, 1080, 1050,  920,  790,  640,  380,  250,  150,    0,  495,  655,
   0, 1390, 1350, 1320, 1190, 1060,  920,  650,  530,  420,  280,    0,  325,
   0, 1530, 1490, 1460, 1330, 1200, 1060,  790,  670,  560,  410,  140,    0 };

int concessionTicketPrice[ 13 ][ 13 ] = {
   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,    0,    0,
   0,   0,   0,   0, 250, 350, 460, 665, 755, 830, 940, 1145, 1250,
   0,  20,   0,   0, 220, 320, 425, 625, 715, 800, 910, 1115, 1220,
   0,  35,  20,   0, 200, 295, 400, 605, 695, 775, 890, 1090, 1195,
   0, 100,  80,  65,   0, 200, 310, 505, 605, 685, 790,  995, 1100,
   0, 165, 145, 130,  65,   0, 205, 410, 505, 580, 695,  895, 1000,
   0, 240, 215, 200, 140,  70,   0, 305, 395, 475, 580,  790,  895,
   0, 375, 350, 335, 270, 205, 135,   0, 200, 275, 385,  590,  695,
   0, 435, 410, 395, 335, 270, 195,  65,   0, 185, 290,  500,  605,
   0, 485, 465, 450, 390, 320, 250, 115, 55,    0, 215,  415,  520,
   0, 560, 540, 525, 460, 395, 320, 190, 125,  75,   0,  310,  410,
   0, 695, 675, 660, 595, 530, 460, 325, 265, 210, 140,    0,  205,
   0, 765, 745, 730, 665, 600, 530, 395, 335, 280, 205,   70,    0 };


// Reservation default constructor initializes data members
Reservation::Reservation( string theReservationNumber, string theTrainNumber,
                          string theIdNumber, string thePhone, string theDate,
                          int theOriginStation, int theDestinationStation,
                          int theCarClass, int theAdultTickets , int theConcessionTickets )
{
   setReservationNumber( theReservationNumber );
   setTrainNumber( theTrainNumber );
   setIdNumber( theIdNumber );
   setPhone( thePhone );
   setDate( theDate );
   setOriginStation( theOriginStation );
   setDestinationStation( theDestinationStation );
   setCarClass( theCarClass );
   setAdultTickets( theAdultTickets );
   setConcessionTickets( theConcessionTickets );
} // end Reservation default constructor


void Reservation::setReservationNumber(string theReservationNumber)
{
	strcpy_s(reservationNumber , theReservationNumber.c_str());
}

string Reservation::getReservationNumber()
{
   string buffer( reservationNumber );
   return buffer;
}

void Reservation::setTrainNumber(string theTrainNumber)
{
	strcpy_s(trainNumber, theTrainNumber.c_str());
}

void Reservation::setIdNumber(string theIdNumber)
{
	strcpy_s(idNumber, theIdNumber.c_str());
}

string Reservation::getIdNumber()
{
   string buffer( idNumber );
   return buffer;
}

void Reservation::setPhone(string thePhone)
{
	strcpy_s(phone, thePhone.c_str());
}

void Reservation::setDate(string theDate)
{
	strcpy_s(date, theDate.c_str());
}

void Reservation::setOriginStation( int theOriginStation )
{
   originStation = ( ( theOriginStation >= 1 && theOriginStation <= 12 ) ? theOriginStation : 1 );
}

int Reservation::getOriginStation()
{
    return originStation;
}

void Reservation::setDestinationStation( int theDestinationStation )
{
   destinationStation = ( ( theDestinationStation >= 1 && theDestinationStation <= 12 ) ? theDestinationStation : 1 );
}

int Reservation::getDestinationStation()
{
   return destinationStation;
}

void Reservation::setCarClass( int theCarClass )
{
   carClass = ( ( theCarClass == 1 || theCarClass == 2 ) ? theCarClass : 0 );
}

void Reservation::setAdultTickets( int theAdultTickets )
{
   adultTickets = ( theAdultTickets > 0 ? theAdultTickets : 0 );
}

int Reservation::getAdultTickets()
{
   return adultTickets;
}

void Reservation::setConcessionTickets( int theConcessionTickets )
{
   concessionTickets = ( theConcessionTickets > 0 ? theConcessionTickets : 0 );
}

int Reservation::getConcessionTickets()
{
   return concessionTickets;
}

void Reservation::displayReservationDetails()
{
	string station[13] = { "" , "Nangang" , "Taipei" , "Banqiao" , "Taoyuan"
							  ,"Hsinchu" , "Miaoli" , "Taichung" , "Changhua"
							  , "Yunlin" , "Chiayi" , "Tainan" , "Zuoying" };
	string Carclass[3] = { "" , "Standard Car" , "Business Car" };
	int adultPrice;
	int concessionPrice;
	cout << "\nTrain No.    From        To        Date  Departure  Arrival   Adult  Concession  Fare       Class" << endl;
	cout << setw(8) << trainNumber << setw(9) << station[originStation] << setw(10) << station[destinationStation]
		 << setw(12) << date;

	if (originStation < destinationStation)
	{
		SouthboundTimetable southboundTime;
		adultPrice = adultTicketPrice[destinationStation][originStation];
		concessionPrice = concessionTicketPrice[destinationStation][originStation];

		cout << setw(11) << southboundTime.searchTrain(trainNumber)->getDepartureTimes(originStation) 
			 << setw(9) << southboundTime.searchTrain(trainNumber)->getDepartureTimes(destinationStation);
		cout << setw(6) << adultPrice << "*" << adultTickets
			<< setw(10) << concessionPrice << "*" << concessionTickets;

	}
	else
	{
		NorthboundTimetable northboundTime;
		adultPrice = adultTicketPrice[originStation][destinationStation];
		concessionPrice = concessionTicketPrice[originStation][destinationStation];

		cout << setw(11) << northboundTime.searchTrain(trainNumber)->getDepartureTimes(originStation)
			<< setw(9) << northboundTime.searchTrain(trainNumber)->getDepartureTimes(destinationStation);
		cout << setw(6) << adultPrice << "*" << adultTickets
			<< setw(10) << concessionPrice << "*" << concessionTickets;

	}

	int total = adultPrice * adultTickets + concessionPrice * concessionTickets;
	cout << setw(6) << total;

	cout << setw(12) << Carclass[carClass];

	cout << endl;
		
}