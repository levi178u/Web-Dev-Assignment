import React from 'react'
import { Link, Stack, Typography } from '@mui/material'
import { BsMeta, BsInstagram, BsX } from 'react-icons/bs'

const Footer = () => {
    return (
        <Stack width="100%" sx={{ pt: '85px' }}>
            <Stack
                width="100%"
                height="130px"
                sx={{ backgroundColor: '#357ABD' }}
                py="10px"
                px="40px"
                justifyContent="center"
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    height="100%"
                    sx={{ borderTop: '3px solid #FFF' }}
                >
                    <Typography
                        fontSize="16px"
                        fontWeight="light"
                        color="white"
                        alignSelf="center"
                    >
                        Made with ❤️ by CSE S2 peeps
                    </Typography>

                    <Stack
                        direction="row"
                        gap="15px"
                        justifyContent="flex-end"
                        alignSelf="center"
                    >
                        <a target="_blank" rel='noreferrer' href="https://www.instagram.com/">
                            <BsInstagram fontSize="30px" color="white" />
                        </a>
                        <a target="_blank" rel='noreferrer' href="https://www.meta.com/">
                            <BsMeta fontSize="30px" color="white" />
                        </a>
                        <a target="_blank" rel='noreferrer' href="https://www.x.com/">
                            <BsX fontSize="30px" color="white" />
                        </a>
                    </Stack>
                </Stack>
                <Link
                    href="https://github.com/levi178u/Web-Dev-Assignment"
                    target="_blank"
                    sx={{
                        fontSize: '12px',
                        color: 'white',
                        margin: 'auto',
                        opacity: '50%',
                    }}
                >
                    GitHub
                </Link>
            </Stack>
        </Stack>
    )
}

export default Footer
