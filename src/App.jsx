import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Gateway from './pages/Gateway';
import StudentPortal from './pages/StudentPortal';
import IndustryPortal from './pages/IndustryPortal';
import AcademiaPortal from './pages/AcademiaPortal';
import InstitutionPortal from './pages/InstitutionPortal';
import FacultyPortal from './pages/FacultyPortal';
import AmbientBackground from './components/common/AmbientBackground';

function App() {
  return (
    <BrowserRouter>
      <AmbientBackground />
      <Routes>
        {/* Gateway Page */}
        <Route path="/" element={<Gateway />} />

        {/* Portals */}
        <Route path="/student/*" element={<StudentPortal />} />
        <Route path="/industry/*" element={<IndustryPortal />} />
        <Route path="/faculty/*" element={<FacultyPortal />} />
        <Route path="/academia/*" element={<AcademiaPortal />} />
        <Route path="/institution/*" element={<InstitutionPortal />} />

        {/* Fallback routing */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
