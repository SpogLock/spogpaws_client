'use client';

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Container,
  Fab,
  IconButton,
  Paper,
  TextField,
  Typography,
  Stack,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';

export default function MaterialDemo() {
  const [switchChecked, setSwitchChecked] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Material Design 3 Components
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph>
        This demo showcases Material Design 3 components integrated with your Next.js application.
      </Typography>

      <Stack spacing={4}>
        {/* Buttons Section */}
        <Paper elevation={1} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Buttons
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Button variant="contained">Filled Button</Button>
            <Button variant="outlined">Outlined Button</Button>
            <Button variant="text">Text Button</Button>
            <Button variant="contained" startIcon={<AddIcon />}>
              With Icon
            </Button>
            <Fab color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </Stack>
        </Paper>

        {/* Cards Section */}
        <Paper elevation={1} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Cards
          </Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Pet Care Services
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Connect with qualified veterinarians for your pet's health and wellness needs.
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345 }}>
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  Pet Adoption
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Find your perfect companion from our network of trusted shelters and rescue organizations.
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <Button size="small">Browse Pets</Button>
              </CardActions>
            </Card>
          </Stack>
        </Paper>

        {/* Form Elements Section */}
        <Paper elevation={1} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Form Elements
          </Typography>
          <Stack spacing={3}>
            <TextField
              label="Search for pets or services"
              variant="outlined"
              fullWidth
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
            />
            
            <Stack direction="row" spacing={2} alignItems="center">
              <FormControlLabel
                control={
                  <Switch
                    checked={switchChecked}
                    onChange={(e) => setSwitchChecked(e.target.checked)}
                  />
                }
                label="Enable notifications"
              />
            </Stack>
          </Stack>
        </Paper>

        {/* Chips Section */}
        <Paper elevation={1} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Chips
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            <Chip label="Dogs" variant="filled" />
            <Chip label="Cats" variant="outlined" />
            <Chip label="Birds" variant="filled" />
            <Chip 
              label="Emergency" 
              variant="filled" 
              color="error"
              onDelete={() => {}}
              deleteIcon={<DeleteIcon />}
            />
            <Chip label="24/7 Support" variant="outlined" color="success" />
          </Stack>
        </Paper>

        {/* Typography Section */}
        <Paper elevation={1} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Typography Scale
          </Typography>
          <Stack spacing={2}>
            <Typography variant="h1">Display Large</Typography>
            <Typography variant="h2">Display Medium</Typography>
            <Typography variant="h3">Display Small</Typography>
            <Typography variant="h4">Headline Large</Typography>
            <Typography variant="h5">Headline Medium</Typography>
            <Typography variant="h6">Headline Small</Typography>
            <Typography variant="body1">Body Large - This is the primary body text used for most content.</Typography>
            <Typography variant="body2">Body Medium - This is used for secondary text and descriptions.</Typography>
            <Typography variant="button">Button Text</Typography>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
} 