import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styles: `
    @keyframes blob {
      0%, 100% { transform: translate(0, 0) scale(1); }
      25% { transform: translate(20px, -50px) scale(1.1); }
      50% { transform: translate(-20px, 20px) scale(0.9); }
      75% { transform: translate(50px, 50px) scale(1.05); }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }

    @keyframes fade-in-up {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes bounce-subtle {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }

    .animate-blob {
      animation: blob 7s infinite;
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    .animate-fade-in-up {
      animation: fade-in-up 0.8s ease-out;
    }

    .animate-fade-in {
      animation: fade-in 1s ease-out;
    }

    .animate-bounce-subtle {
      animation: bounce-subtle 2s ease-in-out infinite;
    }

    .animation-delay-200 {
      animation-delay: 0.2s;
    }

    .animation-delay-300 {
      animation-delay: 0.3s;
    }

    .animation-delay-400 {
      animation-delay: 0.4s;
    }

    .animation-delay-1000 {
      animation-delay: 1s;
    }

    .animation-delay-2000 {
      animation-delay: 2s;
    }

    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `,
})
export class LandingPage {

}
