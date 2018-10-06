const int trigpin = 9;
const int echopin = 10;

long duration;
int distance;


void setup() {
  // put your setup code here, to run once:
  pinMode(trigpin, OUTPUT);
  pinMode(echopin, INPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  digitalWrite(trigpin, LOW);
  delayMicroseconds(5);
  digitalWrite(trigpin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigpin, LOW);

  pinMode(echopin, INPUT);
  duration = pulseIn(echopin, HIGH);
  distance = duration*0.034/2;
  if (distance > 82){
  
  }else{
  Serial.print("Distance: ");
  Serial.println(distance);
  }

  delay(100);
}
