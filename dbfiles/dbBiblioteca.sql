ALTER USER 'admin'@'%' IDENTIFIED WITH mysql_native_password BY 'admin';
FLUSH PRIVILEGES;


USE `dbBiblioteca`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Libro`
--

CREATE TABLE `Libro` (
  `id` int NOT NULL,
  `nombreAutor` varchar(100) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `editorial` varchar(100) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `anioPublicacion` varchar(20) NOT NULL,
  `disponibilidad` varchar(20) NOT NULL,
  `img` varchar(10000) NOT NULL
);

--
-- Volcado de datos para la tabla `Libro`
--

INSERT INTO `Libro` (`id`, `nombreAutor`, `titulo`, `editorial`, `categoria`, `anioPublicacion`, `disponibilidad`, `img`) VALUES
(1, 'Gabriel García Márquez', 'Cien años de soledad', 'Sudamericana', 'Ficción', '1967', 'Disponible', 'https://m.media-amazon.com/images/I/71YoFJSz3LL._AC_UF894,1000_QL80_.jpg'),
(2, 'Stephen King', 'The Shining', ' Doubleday', 'Ficción', '1977', 'Disponible', 'https://m.media-amazon.com/images/I/81QckmGleYL._AC_UF894,1000_QL80_.jpg'),
(3, 'Frank Herbert', 'Dune', 'Ace Books', 'Ficción', '1943', 'Disponible', 'https://m.media-amazon.com/images/I/A1u+2fY5yTL._AC_UF894,1000_QL80_.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Prestamo`
--

CREATE TABLE `Prestamo` (
  `id` int NOT NULL,
  `emailUser` varchar(100) NOT NULL,
  `idLibro` int NOT NULL,
  `fechaInicio` varchar(30) NOT NULL,
  `fechaFin` varchar(30) NOT NULL
);

--
-- Volcado de datos para la tabla `Prestamo`
--

INSERT INTO `Prestamo` (`id`, `emailUser`, `idLibro`, `fechaInicio`, `fechaFin`) VALUES
(1, 'jmsa.sanchezarredondo0123@gmail.com', 1, '25/04/2024', '29/04/2024'),
(2, 'jmsa.sanchezarredondo0123@gmail.com', 1, '2024-04-25', '2024-04-28'),
(3, 'jmsa.sanchezarredondo0123@gmail.com', 1, '2024-04-25', '2024-04-28'),
(4, 'daliadelcarmenmendiolasoto@gmail.com', 1, '2024-04-25', '2024-04-29'),
(5, 'jmsa.sanchezarredondo0123@gmail.com', 1, '2024-04-25', '2024-04-29'),
(6, 'daliadelcarmenmendiolasoto@gmail.com', 1, '2024-04-25', '2024-04-30'),
(7, 'tere.diaz.utng@gmail.com', 1, '2024-04-30', '2024-05-03'),
(8, 'alejandro01lozada@gmail.com', 1, '2024-05-06', '2024-05-06'),
(9, 'alejandro01lozada@gmail.com', 1, '2024-05-06', '2024-05-22'),
(10, 'alejandro01lozada@gmail.com', 2, '2024-05-07', '2024-05-22'),
(11, 'jose.pubg0123@gmail.com', 2, '2024-05-15', '2024-05-23'),
(12, 'jose.pubg0123@gmail.com', 1, '2024-05-15', '2024-05-17'),
(13, 'jose.pubg0123@gmail.com', 1, '2024-05-15', '2024-05-23'),
(14, 'jmsa.sanchezarredondo0123@gmail.com', 2, '2024-05-15', '2024-05-21'),
(15, 'jmsa.sanchezarredondo0123@gmail.com', 1, '2024-08-19', '2024-08-29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Rol`
--

CREATE TABLE `Rol` (
  `id` int NOT NULL,
  `tipoRol` varchar(100) NOT NULL
);

--
-- Volcado de datos para la tabla `Rol`
--

INSERT INTO `Rol` (`id`, `tipoRol`) VALUES
(1, 'Bibliotecario'),
(2, 'Usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Usuario`
--

CREATE TABLE `Usuario` (
  `id` int NOT NULL,
  `nombreUsuario` varchar(100) NOT NULL,
  `rol` varchar(100) NOT NULL,
  `contrasena` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `email` varchar(100) NOT NULL
);

--
-- Volcado de datos para la tabla `Usuario`
--

INSERT INTO `Usuario` (`id`, `nombreUsuario`, `rol`, `contrasena`, `email`) VALUES
(1, 'Jose ', 'Bibliotecario', '$2b$10$4Xs7BEredOHK.2oyvDFurei/olmD2UR2C5h2V67EPia6sB2Wz6.eG', 'jmsa.sanchezarredondo0123@gmail.com'),
(2, 'Jose ', 'Usuario', '$2b$10$B0J2XH90cuETspfac99/k.d0uBn2gUsEgaak8kTNPc8aQ/kwBZO4i', 'jose@test.com'),
(13, 'Dalia', 'Usuario', '$2b$10$P70MogLxQ/ipAKldEdpCm.Yf/gtPM2LfqiegNwvgNCcAODWlBLG.G', 'daliadelcarmenmendiolasoto@gmail.com'),
(14, 'Alejandro L', 'Usuario', '$2b$10$dI9M8i2mdmgrsSrmHF4pSexWE3hQJuTdIvcai5wYXYaykSQpzORSi', 'alejandro01lozada@gmail.com'),
(15, 'Omar', 'Usuario', '$2b$10$hLN6BidRVepwNIFgR4FR4.hglnPPGsjfwWDC8xnjJ53WSv5O0d6cS', 'pruebastest849@gmail.com'),
(18, 'Jose', 'Usuario', '$2b$10$3B.KnjVtXBpQR/Ukmlge/e6fexrh0pqXRG.iH15zNhZdrZ3K6mjgq', 'jose.pubg0123@gmail.com'),
(19, 'teresilla', 'Usuario', '$2b$10$Ii2RCHZsLSNeicowbZfw3.v6AZb1.eHU.VVfH1xryAFAnIbgD20Wu', 'tere.diaz.utng@gmail.com'),
(20, 'Alejandro', 'Usuario', '$2b$10$bQH8PPIP6P/Ei4ZpyhmuJunnaqVGgHHKvgRR7Wv1EWVasCSEqgPLa', 'alejandro01lozada@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Libro`
--
ALTER TABLE `Libro`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Prestamo`
--
ALTER TABLE `Prestamo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Rol`
--
ALTER TABLE `Rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `Libro`
--
ALTER TABLE `Libro`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `Prestamo`
--
ALTER TABLE `Prestamo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `Rol`
--
ALTER TABLE `Rol`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `Usuario`
--
ALTER TABLE `Usuario`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

