import React from 'react';
import { Modal, Box, Typography, Divider } from '@mui/material';

const ModalInfo = ({ open, handleClose, data }) => (
  <Modal open={open} onClose={handleClose}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        p: 4,
        boxShadow: 24,
        minWidth: '300px',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" mb={2}>
        Información de las Instituciones
      </Typography>
      <Divider />
      {data && data.length > 0 ? (
        data.map((institution, index) => (
          <div key={index}>
            <Typography variant="body1"><strong>Nombre:</strong> {institution.nombre}</Typography>
            <Typography variant="body1"><strong>Nivel y Modalidad:</strong> {institution.nivel_modalidad}</Typography>
            <Typography variant="body1"><strong>Código Modular:</strong> {institution.codigo_modular}</Typography>
            <Typography variant="body1"><strong>Dirección:</strong> {institution.direccion}</Typography>
            <Typography variant="body1"><strong>Ubicación:</strong> {institution.departamento}, {institution.provincia}, {institution.distrito}, {institution.centro_poblado}</Typography>
            <Typography variant="body1"><strong>UGEL:</strong> {institution.ugel}</Typography>
            <Typography variant="body1"><strong>Código UGEL:</strong> {institution.codigo_ugel}</Typography>
            <Typography variant="body1"><strong>Gestión:</strong> {institution.gestion}</Typography>
            <Typography variant="body1"><strong>Dependencia:</strong> {institution.dependencia}</Typography>
            <Typography variant="body1"><strong>Ubigeo:</strong> {institution.ubigeo}</Typography>
            <Typography variant="body1"><strong>Altitud:</strong> {institution.altitud} m</Typography>
            <Typography variant="body1"><strong>Latitud:</strong> {institution.latitud}</Typography>
            <Typography variant="body1"><strong>Longitud:</strong> {institution.longitud}</Typography>
            <Divider sx={{ marginY: 2 }} />
          </div>
        ))
      ) : (
        <Typography variant="body1">No hay instituciones disponibles en esta ubicación.</Typography>
      )}
    </Box>
  </Modal>
);

export default ModalInfo;
