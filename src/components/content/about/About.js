import React from "react";

function About() {
  return (
    <div className="about">
      <h2>O programie</h2>
      <div>
        <h3>Zasada działania</h3>
        <p>
          Na początku miesiąca podaj stan swojego konta. Dzięki temu program
          będzie w stanie zasymulować stan Twojego konta na podstawie tej
          wartości oraz przychodów i wydatków
        </p>
        <p>
          Wpisując aktualny stan swojego konta w pole{" "}
          <span>Rzeczywisty stan konta </span>
          zobaczysz wartość bezwzględną różnicy pomiędzy symulacją, a stanem
          faktycznym. Pamiętaj, że różnica wynika tylko z dokładności podanch
          przez Ciebie danych, dlatego polecam dokładnie zapisywać każdy wydatek
          i każdy dochód.
        </p>
      </div>
    </div>
  );
}

export default About;
