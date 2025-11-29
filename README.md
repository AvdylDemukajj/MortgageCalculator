# Lloyds Bank Mortgage Calculator

A modern, interactive mortgage calculator application built with React and Vite for Lloyds Bank.

## Overview

This project is an advanced Mortgage Calculator that provides an intuitive and professional experience for clients calculating their monthly mortgage payments. The application implements a four-step wizard system and delivers interactive results with adjustment capabilities.

## Core Features

- **Multi-Step Wizard**: Clear, guided process reducing cognitive load
- **Modern Design System**: Glass morphism effects and smooth animations
- **Real-time Validation**: Continuous feedback mechanism for users
- **Interactive Results**: Clear charts and data visualizations
- **Automatic Persistence**: Data automatically saved to localStorage
- **Accessibility**: Fully accessible implementation meeting WCAG 2.1 Level AA standards

## Technology Stack

- **React 19** - Modern UI framework
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations
- **Lucide React** - Modern icon library

## Documentation

The project includes comprehensive documentation for presentation and feedback:

- **[PRESENTATION.md](./PRESENTATION.md)** - Detailed design presentation and feature documentation
- **[FEEDBACK_FORM.md](./FEEDBACK_FORM.md)** - Feedback collection form for focus groups
- **[FEEDBACK_GUIDE.md](./FEEDBACK_GUIDE.md)** - Guide for using feedback for design refinement

## Installation and Usage

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Layout.jsx          # Header, Footer, Navigation
│   ├── Wizard.jsx          # Multi-step wizard logic
│   └── steps/
│       ├── StepProperty.jsx    # Step 1: Property & Deposit
│       ├── StepIncome.jsx       # Step 2: Income & Details
│       ├── StepOptions.jsx     # Step 3: Mortgage Options
│       └── StepResults.jsx      # Step 4: Results & Adjustments
├── utils/
│   └── calculateMortgage.js    # Mortgage calculation logic
├── App.jsx                 # Main application component
└── main.jsx               # Application entry point
```

## Using Focus Group Feedback

To utilize feedback from Virtual Focus Groups:

1. **Prepare Presentation**: Use `PRESENTATION.md` as foundation
2. **Collect Feedback**: Use `FEEDBACK_FORM.md` to document feedback
3. **Analyze and Refine**: Follow guidelines in `FEEDBACK_GUIDE.md`

## License

This project is created for educational and demonstrative purposes.

## Contributor

AvdylDemukajj
