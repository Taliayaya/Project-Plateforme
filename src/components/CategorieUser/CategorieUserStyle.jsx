// Copyright (C) 2022 Ilan Mayeux, ilanvinord@gmail.com
//
// This program is free software; you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation; either version 2 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along
// with this program; if not, write to the Free Software Foundation, Inc.,
// 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.

import styled from 'styled-components'
import { theme } from '../../utils/style/colors'

export const ContainerUser = styled.div`
    overflow-y: scroll;
    @media screen and (min-height: 720px) {
        height: 80vh;
    }
    @media screen and (min-height: 680px) and (max-height: 720px) {
        height: 65vh;
    }
    @media screen and (min-height: 480px) and (max-height: 680px) {
        height: 55vh;
    }
    @media screen and (max-height: 480px) {
        height: 40vh;
    }
`
export const StyleCategorie = styled.h4`
    font-weight: bold;
    padding: 10px;
    font-size: medium;
    text-transform: uppercase;
    color: ${theme.userList_font_color};
`
