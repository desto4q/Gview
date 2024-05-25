import React, { useEffect, useState } from 'react';
import { View, Text, Button, Modal, Alert } from 'react-native';
import { tw, versionChecker } from '../exports/exports'; // Adjust the path as necessary

const CURRENT_VERSION = 1.0; // Your app's current version

const CheckForUpdate: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [newVersion, setNewVersion] = useState<number | null>(null);

    useEffect(() => {
        const checkForUpdate = async () => {
            try {
                const response = await fetch('https://api.jsonbin.io/v3/b/664bead4ad19ca34f86ca2d8?meta=false'); // Replace with your API endpoint
                const data = await response.json();
                if (await versionChecker() < data.version) {
                    setNewVersion(data.version);
                    setModalVisible(true);
                }
            } catch (error) {
                console.error('Failed to fetch version info:', error);
            }
        };

        checkForUpdate();
    }, []);

    const handleUpdate = () => {
        // Implement your update logic here
        Alert.alert('Update', 'Redirecting to update...');
        setModalVisible(false);
    };

    return (
        <View style={tw('flex-1 justify-center items-center')}>
            <Text style={tw('text-lg')}>Current Version: {CURRENT_VERSION}</Text>

            {newVersion && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={tw('flex-1 justify-center items-center bg-gray-800 bg-opacity-50')}>
                        <View style={tw('bg-neutral-800 gap-2 p-6 rounded-lg')}>
                            <Text style={tw('text-lg mb-4')}>A new version ({newVersion}) is available!</Text>
                            <Button title="Update Now" onPress={handleUpdate} />
                            <Button title="Later" onPress={() => setModalVisible(false)} />
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

export default CheckForUpdate;
