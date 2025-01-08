/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const userDataList = [
  {
    id: '1',
    firstName: 'Stannis',
    lastName: 'Baratheon',
    status: 'Archived',
    admissionDate: '2025-01-06',
    dateOfBirth: '2005-01-01',
    gender: 'Male',
    unit: 'Block C',
    nhsNumber: 'N/A',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Doe',
    status: 'Admitted',
    admissionDate: '2025-01-06',
    dateOfBirth: '2003-05-15',
    gender: 'Female',
    unit: 'Block C',
    nhsNumber: 'N/A',
  },
  {
    id: '3',
    firstName: 'Jamie',
    lastName: 'Lannister',
    status: 'Discharged',
    admissionDate: '2025-01-06',
    dateOfBirth: '2002-08-20',
    gender: 'Male',
    unit: 'Block E',
    nhsNumber: 'N/A',
  },
  {
    id: '4',
    firstName: 'Billy',
    lastName: 'Kimber',
    status: 'Deceased',
    admissionDate: '2025-01-06',
    dateOfBirth: '2000-12-30',
    gender: 'Male',
    unit: 'Block A',
    nhsNumber: 'N/A',
  },
  {
    id: '5',
    firstName: 'Billy',
    lastName: 'Kimber',
    status: 'Deceased',
    admissionDate: '2025-01-06',
    dateOfBirth: '2000-12-30',
    gender: 'Male',
    unit: 'Block A',
    nhsNumber: 'N/A',
  },
  {
    id: '6',
    firstName: 'Billy',
    lastName: 'Kimber',
    status: 'Deceased',
    admissionDate: '2025-01-06',
    dateOfBirth: '2000-12-30',
    gender: 'Male',
    unit: 'Block A',
    nhsNumber: 'N/A',
  }
];

export default function ServiceUsersList() {
  const [search, setSearch] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 5;

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const getStatusStyle = (status: string) => {
    const styles = {
      Admitted: 'bg-green-100 text-green-800',
      Deceased: 'bg-red-100 text-red-800',
      Discharged: 'bg-gray-100 text-gray-800',
      Archived: 'bg-blue-100 text-blue-800',
    };
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800';
  };

  const filteredData = userDataList.filter(user => {
    const matchesUnit = selectedUnit ? user.unit === selectedUnit : true;
    const matchesStatus = selectedStatus ? user.status === selectedStatus : true;
    const matchesSearch = search.toLowerCase().trim() === '' ? true :
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      user.nhsNumber.toLowerCase().includes(search.toLowerCase());
    return matchesUnit && matchesStatus && matchesSearch;
  });

  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const UserCard = ({ user }: { user: any }) => (
    <TouchableOpacity 
      className="bg-white rounded-xl shadow-sm mb-3 overflow-hidden border border-gray-100"
      onPress={() => router.push('/(root)/(tabs)/details')}
    >
      <View className="p-4">
        <View className="flex-row justify-between items-start mb-3">
          <View className="flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-indigo-100 items-center justify-center">
              <Text className="text-lg font-bold text-indigo-600">
                {user.firstName[0]}{user.lastName[0]}
              </Text>
            </View>
            <View className="ml-3">
              <Text className="text-lg font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </Text>
              <Text className="text-sm text-gray-500">
                NHS: {user.nhsNumber}
              </Text>
            </View>
          </View>
          <View className={`px-3 py-1 rounded-full ${getStatusStyle(user.status)}`}>
            <Text className="text-sm font-medium">{user.status}</Text>
          </View>
        </View>

        <View className="flex-row flex-wrap gap-y-2">
          <View className="w-1/2 flex-row items-center">
            <Ionicons name="calendar-outline" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 ml-2">
              Age: {calculateAge(user.dateOfBirth)}
            </Text>
          </View>
          <View className="w-1/2 flex-row items-center">
            <Ionicons name="person-outline" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 ml-2">
              {user.gender}
            </Text>
          </View>
          <View className="w-1/2 flex-row items-center">
            <Ionicons name="business-outline" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 ml-2">
              {user.unit}
            </Text>
          </View>
          <View className="w-1/2 flex-row items-center">
            <Ionicons name="enter-outline" size={16} color="#6B7280" />
            <Text className="text-sm text-gray-600 ml-2">
              Admitted: {new Date(user.admissionDate).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center">
            <Text className="text-2xl font-bold text-gray-900">Service Users</Text>
            <View className="ml-2 bg-indigo-100 px-3 py-1 rounded-full">
              <Text className="text-indigo-600 font-medium">{userDataList.length}</Text>
            </View>
          </View>
          <TouchableOpacity 
            className="p-2"
            onPress={() => setShowFilters(!showFilters)}
          >
            <Ionicons name="options-outline" size={24} color="#4F46E5" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            className="flex-1 ml-2 text-gray-900"
            placeholder="Search by name or NHS number"
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#6B7280"
          />
        </View>
      </View>

      {/* Filters */}
      {showFilters && (
        <View className="bg-white px-4 py-3 border-b border-gray-200">
          <View className="flex-row flex-wrap gap-2">
            {['Block A', 'Block B', 'Block C', 'Block D'].map((unit) => (
              <TouchableOpacity
                key={unit}
                className={`px-3 py-1 rounded-full border ${
                  selectedUnit === unit ? 'bg-indigo-100 border-indigo-600' : 'border-gray-300'
                }`}
                onPress={() => setSelectedUnit(selectedUnit === unit ? '' : unit)}
              >
                <Text className={selectedUnit === unit ? 'text-indigo-600' : 'text-gray-600'}>
                  {unit}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View className="flex-row flex-wrap gap-2 mt-2">
            {['Admitted', 'Discharged', 'Deceased', 'Archived'].map((status) => (
              <TouchableOpacity
                key={status}
                className={`px-3 py-1 rounded-full border ${
                  selectedStatus === status ? 'bg-indigo-100 border-indigo-600' : 'border-gray-300'
                }`}
                onPress={() => setSelectedStatus(selectedStatus === status ? '' : status)}
              >
                <Text className={selectedStatus === status ? 'text-indigo-600' : 'text-gray-600'}>
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* List */}
      <FlatList
        data={currentItems}
        renderItem={({ item }) => <UserCard user={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <View className="flex-row justify-between items-center p-4 bg-white border-t border-gray-200">
          <TouchableOpacity
            className={`p-2 ${currentPage === 1 ? 'opacity-50' : ''}`}
            onPress={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <View className="flex-row items-center">
              <Ionicons name="chevron-back" size={24} color="#4F46E5" />
              <Text className="text-indigo-600 font-medium ml-1">Previous</Text>
            </View>
          </TouchableOpacity>
          
          <Text className="text-gray-600 font-medium">
            Page {currentPage} of {totalPages}
          </Text>
          
          <TouchableOpacity
            className={`p-2 ${currentPage === totalPages ? 'opacity-50' : ''}`}
            onPress={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            <View className="flex-row items-center">
              <Text className="text-indigo-600 font-medium mr-1">Next</Text>
              <Ionicons name="chevron-forward" size={24} color="#4F46E5" />
            </View>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}